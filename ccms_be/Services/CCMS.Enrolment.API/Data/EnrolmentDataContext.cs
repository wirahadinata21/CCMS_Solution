using Microsoft.EntityFrameworkCore;
using CCMS.Enrolment.API.Entities;

namespace CCMS.Enrolment.API.Data
{
    public class EnrolmentDataContext : DbContext
    {
        public EnrolmentDataContext(DbContextOptions<EnrolmentDataContext> options) : base(options) { }

        // DbSets khusus modul Enrolment
        public DbSet<ParentEnquiry> ParentEnquiries { get; set; }
        public DbSet<VisitSchedule> VisitSchedules { get; set; }
        public DbSet<WaitlistEntry> WaitlistEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary Keys
            modelBuilder.Entity<ParentEnquiry>().HasKey(e => e.Id);
            modelBuilder.Entity<VisitSchedule>().HasKey(v => v.Id);
            modelBuilder.Entity<WaitlistEntry>().HasKey(w => w.Id);

            // Query filter untuk soft delete
            modelBuilder.Entity<ParentEnquiry>().HasQueryFilter(e => !e.IsDeleted);
            modelBuilder.Entity<VisitSchedule>().HasQueryFilter(v => !v.IsDeleted);
            modelBuilder.Entity<WaitlistEntry>().HasQueryFilter(w => !w.IsDeleted);

            // Config ParentEnquiry
            modelBuilder.Entity<ParentEnquiry>(entity =>
            {
                entity.Property(e => e.EnquiryStatusId).IsRequired();
                entity.Property(e => e.EnquiryStatusName).HasMaxLength(100);
            });

            // Relasi VisitSchedule (many-to-one)
            modelBuilder.Entity<VisitSchedule>()
                .HasOne(v => v.ParentEnquiry)
                .WithMany(e => e.VisitSchedules)
                .HasForeignKey(v => v.ParentEnquiryId);

            // Relasi WaitlistEntry (one-to-one)
            modelBuilder.Entity<WaitlistEntry>()
                .HasOne(w => w.ParentEnquiry)
                .WithOne(e => e.WaitlistEntry)
                .HasForeignKey<WaitlistEntry>(w => w.ParentEnquiryId);

            // --- Seeder ---
            var parentEnquiryId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
            var visitScheduleId = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
            var waitlistEntryId = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc");

            modelBuilder.Entity<ParentEnquiry>().HasData(
                new ParentEnquiry
                {
                    Id = parentEnquiryId,
                    ParentName = "John Doe",
                    Email = "john@example.com",
                    Phone = "08123456789",
                    ChildName = "Jane Doe",
                    DateOfBirth = new DateTime(2021, 5, 10, 0, 0, 0, DateTimeKind.Utc),
                    PreferredStartDate = new DateTime(2026, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                    CentreName = "Jakarta Centre",
                    EnquiryStatusId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    EnquiryStatusName = "New",
                    Notes = "Initial enquiry",
                    CreatedAt = new DateTime(2026, 1, 31, 10, 0, 0, DateTimeKind.Utc),
                    IsActive = true,
                    IsDeleted = false
                }
            );

            modelBuilder.Entity<VisitSchedule>().HasData(
                new VisitSchedule
                {
                    Id = visitScheduleId,
                    ParentEnquiryId = parentEnquiryId,
                    VisitDate = new DateTime(2026, 2, 7, 0, 0, 0, DateTimeKind.Utc),
                    AssignedStaff = "Staff A",
                    Status = VisitStatus.Scheduled,
                    CreatedAt = new DateTime(2026, 1, 31, 10, 0, 0, DateTimeKind.Utc),
                    IsActive = true,
                    IsDeleted = false
                }
            );

            modelBuilder.Entity<WaitlistEntry>().HasData(
                new WaitlistEntry
                {
                    Id = waitlistEntryId,
                    ParentEnquiryId = parentEnquiryId,
                    PriorityNote = "High priority - sibling already enrolled",
                    WaitlistedAt = new DateTime(2026, 1, 31, 0, 0, 0, DateTimeKind.Utc),
                    CreatedAt = new DateTime(2026, 1, 31, 10, 0, 0, DateTimeKind.Utc),
                    IsActive = true,
                    IsDeleted = false
                }
            );
        }
    }
}
