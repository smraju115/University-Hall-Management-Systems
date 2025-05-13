using System.ComponentModel.DataAnnotations;

namespace HallManagement.ViewModels.Identity
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;
    }
}
