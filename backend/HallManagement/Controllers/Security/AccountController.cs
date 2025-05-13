using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.AspNetCore.Authorization;
using System.Web;
using HallManagement.Shared.Models;
using HallManagement.ViewModels.Identity;

namespace HallManagement.Controllers.Security
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration config;

        public AccountController(UserManager<AppUser> userManager, IConfiguration config )
        {
            this.userManager = userManager;
            this.config = config;
            
        }
        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            try
            {
                // Check if the username is already in use
                var existingUserByUsername = await userManager.FindByNameAsync(model.Username);
                if (existingUserByUsername != null)
                {
                    return BadRequest("Username is already in use.");
                }

                // Check if the email is already in use
                var existingUserByEmail = await userManager.FindByEmailAsync(model.Email);
                if (existingUserByEmail != null)
                {
                    return BadRequest("Email is already in use.");
                }

                // Check if the phone number is already in use
                var existingUserByPhoneNumber = await userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == model.PhoneNumber);
                if (existingUserByPhoneNumber != null)
                {
                    return BadRequest("Phone number is already in use.");
                }

                // If not, proceed with user registration
                var user = new AppUser
                {
                    Email = model.Email,
                    UserName = model.Username,
                    PhoneNumber = model.PhoneNumber,
                    SecurityStamp = Guid.NewGuid().ToString()

                };

                // Ensure that the password is not empty or null
                if (string.IsNullOrEmpty(model.Password))
                {
                    return BadRequest("Password cannot be empty.");
                }

                var result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "User");
                    return Ok(new { Username = user.UserName });
                }

                // Handle password validation errors separately
                var passwordErrors = result.Errors.Where(error => error.Code.StartsWith("Password")).ToList();
                if (passwordErrors.Any())
                {
                    return BadRequest(passwordErrors.Select(error => error.Description));
                }

                return BadRequest(result.Errors.Select(error => error.Description));
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                Console.WriteLine(ex);

                // Return a more informative response to the client
                return StatusCode(500, $"An error occurred while processing your request. Details: {ex.Message}");
            }
        }

        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            var user = await FindUserAsync(model.Identifier);

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await userManager.GetRolesAsync(user);
                var signingKey = Encoding.UTF8.GetBytes(config["Jwt:SigningKey"] ?? "IsDB-BISEW HallManagement ESAD-59");
                var expiryDuration = int.Parse(config["Jwt:ExpiryInMinutes"] ?? "3000");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = null,
                    Audience = null,
                    IssuedAt = DateTime.UtcNow,
                    NotBefore = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(expiryDuration),
                    Subject = new ClaimsIdentity(
                        new List<Claim> {
                    new Claim("username", user.UserName ?? ""),
                    new Claim("phone", user.PhoneNumber ?? ""),
                    new Claim("email", user.Email ?? ""),
                    new Claim("roles", string.Join(",", roles)),
                    new Claim("expires", DateTime.UtcNow.AddMinutes(expiryDuration).ToString("yyyy-MM-ddTHH:mm:ss"))
                        }),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
                };

                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
                var token = jwtTokenHandler.WriteToken(jwtToken);

                return Ok(new { Token = token, user });
            }

            // Log details for debugging
            if (user == null)
            {
                Console.WriteLine("User not found.");
                return NotFound(new { Message = "User not found." });
            }
            else
            {
                Console.WriteLine("Password check failed.");
                return BadRequest(new { Message = "Incorrect password." });
            }
        }

        private async Task<AppUser?> FindUserAsync(string identifier)
        {
            // Try finding the user by email
            var user = await userManager.FindByEmailAsync(identifier);

            // If not found, try finding by username
            if (user == null)
            {
                user = await userManager.FindByNameAsync(identifier);
            }

            // If still not found, try finding by phone number
            if (user == null && !string.IsNullOrEmpty(identifier) && new PhoneAttribute().IsValid(identifier))
            {
                user = await userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == identifier);
            }

            return user;
        }     
    }
    
}
