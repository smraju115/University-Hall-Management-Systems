﻿using System.ComponentModel.DataAnnotations;

namespace HallManagement.ViewModels.Identity
{
    public class ResetPasswordViewModel
    {
        
        [EmailAddress]
        public string? Email { get; set; } = default!;

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 6)]
        public string Password { get; set; } = default!;

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password and ConfirmPassword must match")]
        public string ConfirmPassword { get; set; } = default!;
        public string? Token { get; set; } = default!;
    }
}
