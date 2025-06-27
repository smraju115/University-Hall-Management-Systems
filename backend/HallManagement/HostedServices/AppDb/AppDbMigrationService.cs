using HallManagement.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace HallManagement.HostedServices.AppDb
{
    public class AppDbMigrationService
    {
        //private readonly HallDbContext db;
        //public AppDbMigrationService(HallDbContext db)  
        //{
        //    this.db = db;
        //}
        //public async Task MigrationAsync() 
        //{
        //    if ((await db.Database.GetPendingMigrationsAsync()).Any())
        //    {
        //        await db.Database.MigrateAsync();
        //    }
        //}

        private readonly HallDbContext db;
        public AppDbMigrationService(HallDbContext db)
        {
            this.db = db;
        }

        public async Task MigrationAsync()
        {
            try
            {
                var pending = await db.Database.GetPendingMigrationsAsync();

                if (pending.Any())
                {
                    await db.Database.MigrateAsync();
                }
            }
            catch (Microsoft.Data.SqlClient.SqlException ex)
            {
                if (ex.Message.Contains("already an object named 'AspNetRoles'"))
                {
                    // Optional: log or ignore safely
                    Console.WriteLine("Migration skipped: AspNetRoles table already exists.");
                }
                else
                {
                    // অন্য error হলে propagate করবো
                    throw;
                }
            }
        }

    }
}
