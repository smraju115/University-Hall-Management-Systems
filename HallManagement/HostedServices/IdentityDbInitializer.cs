
using HallManagement.Shared.Models;
using Microsoft.AspNetCore.Identity;

namespace HallManagement.HostedServices
{
    public class IdentityDbInitializer
    {
        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly HallDbContext _hallDbContext;
        public IdentityDbInitializer(HallDbContext _hallDbContext, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this._hallDbContext = _hallDbContext;

            if (!_hallDbContext.Database.CanConnect())
            {
                this._hallDbContext.Database.EnsureCreated();
            }
        }

        public async Task SeedAsync()
        {
            string[] roles = { "Admin", "User" };

            foreach (string role in roles)
            {
                await CreateRole(role);
            }

            var adminUser = new AppUser { UserName = "Admin", Email = "admin@gmail.com", PhoneNumber = "01742429948" };
            await CreateUser(adminUser, "@ESAD1234", "Admin");

            var userUser = new AppUser { UserName = "User", Email = "user@gmail.com", PhoneNumber = "01742429949" };
            await CreateUser(userUser, "@ESAD1234", "User");
        }

        private async Task CreateRole(string roleName)
        {
            var exists = await roleManager.RoleExistsAsync(roleName);

            if (!exists)
            {
                await roleManager.CreateAsync(new IdentityRole { Name = roleName, NormalizedName = roleName.ToUpper() });
            }
        }

        private async Task CreateUser(AppUser user, string password, string role)
        {
            var existingUserByName = await userManager.FindByNameAsync(user.UserName ?? "");
            var existingUserByEmail = await userManager.FindByEmailAsync(user.Email ?? "");
            var existingUserByPhoneNumber = await userManager.FindByNameAsync(user.PhoneNumber ?? "");

            if (existingUserByName == null && existingUserByEmail == null && existingUserByPhoneNumber == null)
            {
                await userManager.CreateAsync(user, password);
                await userManager.AddToRoleAsync(user, role);
            }
            else
            {
                // Handle the case where a user with the same username, email, or phone number already exists.
                // You may want to log a message, return an error, or take other appropriate actions.
            }
        }
    }
}
