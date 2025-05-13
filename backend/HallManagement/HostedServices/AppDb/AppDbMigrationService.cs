using HallManagement.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace HallManagement.HostedServices.AppDb
{
    public class AppDbMigrationService
    {
        private readonly HallDbContext db;
        public AppDbMigrationService(HallDbContext db)  
        {
            this.db = db;
        }
        public async Task MigrationAsync() 
        {
            if ((await db.Database.GetPendingMigrationsAsync()).Any())
            {
                await db.Database.MigrateAsync();
            }
        }
    }
}
