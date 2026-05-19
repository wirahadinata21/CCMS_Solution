using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CCMS.Enrolment.API.Data
{
    public class EnrolmentDataContextFactory : IDesignTimeDbContextFactory<EnrolmentDataContext>
    {
        public EnrolmentDataContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<EnrolmentDataContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new EnrolmentDataContext(optionsBuilder.Options);
        }
    }
}
