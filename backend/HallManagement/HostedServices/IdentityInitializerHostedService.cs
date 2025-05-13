namespace HallManagement.HostedServices
{
    public class IdentityInitializerHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<IdentityInitializerHostedService> logger;

        public IdentityInitializerHostedService(IServiceProvider serviceProvider, ILogger<IdentityInitializerHostedService> logger)
        {
            this.serviceProvider = serviceProvider;
            this.logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                using var scope = serviceProvider.CreateScope();
                var seeder = scope.ServiceProvider.GetRequiredService<IdentityDbInitializer>();
                await seeder.SeedAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during identity initialization");
            }
        }
        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}
