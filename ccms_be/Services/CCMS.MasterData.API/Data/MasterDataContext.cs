using Microsoft.EntityFrameworkCore;
using CCMS.MasterData.API.Entities;
using System.Collections.Generic;

namespace CCMS.MasterData.API.Data;

public class MasterDataContext : DbContext
{
    public MasterDataContext(DbContextOptions<MasterDataContext> options) : base(options) { }

    public DbSet<Gender> Genders { get; set; }
    public DbSet<Relationship> Relationships { get; set; }
    public DbSet<Citizenship> Citizenships { get; set; }
    public DbSet<EnrolmentStatus> EnrolmentStatuses { get; set; }
    public DbSet<ClassLevel> ClassLevels { get; set; }
    public DbSet<Religion> Religions { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<HealthCondition> HealthConditions { get; set; }
    public DbSet<FeeType> FeeTypes { get; set; }
    public DbSet<EnquiryStatus> EnquiryStatuses { get; set; }

    // TAMBAHKAN INI UNTUK SEEDING
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Pastikan PK di-set
        modelBuilder.Entity<Citizenship>().HasKey(c => c.Id); 
        // Optional: tambahkan index untuk CountryCode
        modelBuilder.Entity<Citizenship>() .HasIndex(c => c.CountryCode) .IsUnique();

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<ClassLevel>().HasKey(cl => cl.Id); 
        // Optional: tambahkan index untuk Name agar pencarian cepat
        modelBuilder.Entity<ClassLevel>() .HasIndex(cl => cl.Name) .IsUnique(); // misalnya tiap level harus unik

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<EnquiryStatus>().HasKey(es => es.Id); 
        // Optional: tambahkan index untuk Name agar pencarian cepat
        modelBuilder.Entity<EnquiryStatus>() .HasIndex(es => es.Name) .IsUnique(); // misalnya tiap status harus unik: "Received", "Follow-up", dll
        
        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<EnrolmentStatus>().HasKey(es => es.Id); 
        // Optional: tambahkan index untuk Name agar status unik
        modelBuilder.Entity<EnrolmentStatus>() .HasIndex(es => es.Name) .IsUnique();

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<FeeType>().HasKey(ft => ft.Id); 
        // Optional: tambahkan index untuk Name agar tiap jenis fee unik
        modelBuilder.Entity<FeeType>() .HasIndex(ft => ft.Name) .IsUnique();

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<Gender>().HasKey(g => g.Id); 
        // Optional: tambahkan index untuk Name agar pencarian cepat
        modelBuilder.Entity<Gender>() .HasIndex(g => g.Name) .IsUnique(); // misalnya tiap gender harus unik

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<HealthCondition>().HasKey(hc => hc.Id); 
        // Optional: tambahkan index untuk Name agar tiap kondisi unik
        modelBuilder.Entity<HealthCondition>() .HasIndex(hc => hc.Name) .IsUnique();

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<Language>().HasKey(l => l.Id); 
        // Optional: tambahkan index untuk Name agar tiap bahasa unik
        modelBuilder.Entity<Language>() .HasIndex(l => l.Name) .IsUnique(); 
        // Optional: tambahkan index untuk IsDefault kalau kamu mau enforce hanya satu default
        modelBuilder.Entity<Language>() .HasIndex(l => l.IsDefault);

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<Relationship>().HasKey(r => r.Id); 
        // Optional: tambahkan index untuk Name agar tiap relationship unik
        modelBuilder.Entity<Relationship>() .HasIndex(r => r.Name) .IsUnique();

        // PK otomatis dari BaseEntity.Id
        modelBuilder.Entity<Religion>().HasKey(r => r.Id); 
        // Optional: tambahkan index untuk Name agar tiap agama unik
        modelBuilder.Entity<Religion>() .HasIndex(r => r.Name) .IsUnique();

        base.OnModelCreating(modelBuilder);
        // Gender
        modelBuilder.Entity<Gender>().HasData(
            new Gender
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Male",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Gender
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Female",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Relationships
        modelBuilder.Entity<Relationship>().HasData(
            new Relationship
            {
                Id = Guid.Parse("39ECECEC-1DC2-4FDF-9776-932807688439"),
                Name = "Father",
                Description = "Biological or Legal Father",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Relationship
            {
                Id = Guid.Parse("75DE722D-D8C4-4DED-85E4-FEEC33C22992"),
                Name = "Mother",
                Description = "Biological or Legal Mother",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Relationship
            {
                Id = Guid.Parse("0B0E35A2-3514-4B74-850A-D84786D7DE57"),
                Name = "Guardian",
                Description = "Legal Guardian or Relative",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Citizenship
        modelBuilder.Entity<Citizenship>().HasData(
            new Citizenship
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                Name = "Indonesian",
                CountryCode = "ID",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Citizenship
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                Name = "Foreigner",
                CountryCode = "FR",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Enrolment Status
        modelBuilder.Entity<EnrolmentStatus>().HasData(
            new EnrolmentStatus
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                Name = "Enrolled",
                Description = "Child is officially enrolled",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new EnrolmentStatus
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                Name = "Waitlisted",
                Description = "Child is on waitlist",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new EnrolmentStatus
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Name = "Withdrawn",
                Description = "Child has withdrawn",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Class Level
        modelBuilder.Entity<ClassLevel>().HasData(
            new ClassLevel
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Name = "Toddler",
                Description = "Age 18–36 months",
                MinAgeMonths = 18,
                MaxAgeMonths = 36,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new ClassLevel
            {
                Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                Name = "Playgroup",
                Description = "Age 36–48 months",
                MinAgeMonths = 36,
                MaxAgeMonths = 48,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new ClassLevel
            {
                Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                Name = "Kindergarten A",
                Description = "Age 48–60 months",
                MinAgeMonths = 48,
                MaxAgeMonths = 60,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new ClassLevel
            {
                Id = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                Name = "Kindergarten B",
                Description = "Age 60–72 months",
                MinAgeMonths = 60,
                MaxAgeMonths = 72,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Religion
        modelBuilder.Entity<Religion>().HasData(
            new Religion
            {
                Id = Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                Name = "Islam",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Religion
            {
                Id = Guid.Parse("11111111-aaaa-bbbb-cccc-222222222222"),
                Name = "Christianity",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Religion
            {
                Id = Guid.Parse("33333333-aaaa-bbbb-cccc-444444444444"),
                Name = "Hinduism",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Religion
            {
                Id = Guid.Parse("55555555-aaaa-bbbb-cccc-666666666666"),
                Name = "Buddhism",
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Language
        modelBuilder.Entity<Language>().HasData(
            new Language
            {
                Id = Guid.Parse("77777777-aaaa-bbbb-cccc-888888888888"),
                Name = "Bahasa Indonesia",
                Description = "National language of Indonesia",
                IsDefault = true,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Language
            {
                Id = Guid.Parse("99999999-aaaa-bbbb-cccc-000000000000"),
                Name = "English",
                Description = "International language",
                IsDefault = false,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new Language
            {
                Id = Guid.Parse("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"),
                Name = "Mandarin",
                Description = "Chinese language",
                IsDefault = false,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Fee Type
        modelBuilder.Entity<FeeType>().HasData(
            new FeeType
            {
                Id = Guid.Parse("bbbbbbbb-cccc-dddd-eeee-ffffffffffff"),
                Name = "Registration Fee",
                Description = "One-time enrolment fee",
                IsRecurring = false,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new FeeType
            {
                Id = Guid.Parse("cccccccc-dddd-eeee-ffff-111111111111"),
                Name = "Monthly Tuition",
                Description = "Recurring monthly tuition fee",
                IsRecurring = true,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            },
            new FeeType
            {
                Id = Guid.Parse("dddddddd-eeee-ffff-1111-222222222222"),
                Name = "Uniform Fee",
                Description = "One-time uniform purchase fee",
                IsRecurring = false,
                IsActive = true,
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // Seeding default pipeline statuses
        modelBuilder.Entity<EnquiryStatus>().HasData( 
            new EnquiryStatus 
            { 
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), 
                Name = "EnquiryReceived", 
                Description = "Initial enquiry received", 
                IsActive = true, 
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }, 
            new EnquiryStatus 
            { 
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), 
                Name = "FollowUpPending", 
                Description = "Pending staff follow-up", 
                IsActive = true, 
                IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            }, 
            new EnquiryStatus 
            { 
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"), 
                Name = "Enrolled", 
                Description = "Child officially enrolled", 
                IsActive = true, IsDeleted = false,
                CreatedAt = new DateTime(2026, 01, 27, 0, 0, 0, DateTimeKind.Utc)
            } 
            );
    }

}