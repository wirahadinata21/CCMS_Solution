using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CCMS.MasterData.API.Migrations
{
    /// <inheritdoc />
    public partial class InitPostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Citizenships",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CountryCode = table.Column<string>(type: "text", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Citizenships", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClassLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    MinAgeMonths = table.Column<int>(type: "integer", nullable: false),
                    MaxAgeMonths = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassLevels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnquiryStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnquiryStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnrolmentStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrolmentStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FeeTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsRecurring = table.Column<bool>(type: "boolean", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeeTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HealthConditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthConditions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Relationships",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relationships", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Religions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Religions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Citizenships",
                columns: new[] { "Id", "CountryCode", "CreatedAt", "CreatedBy", "IsActive", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("66666666-6666-6666-6666-666666666666"), "ID", new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Indonesian", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("77777777-7777-7777-7777-777777777777"), "FR", new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Foreigner", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "ClassLevels",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Description", "IsActive", "IsDeleted", "MaxAgeMonths", "MinAgeMonths", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Age 18–36 months", true, false, 36, 18, "Toddler", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Age 36–48 months", true, false, 48, 36, "Playgroup", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Age 48–60 months", true, false, 60, 48, "Kindergarten A", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Age 60–72 months", true, false, 72, 60, "Kindergarten B", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "EnquiryStatuses",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Description", "IsActive", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Initial enquiry received", true, false, "EnquiryReceived", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("22222222-2222-2222-2222-222222222222"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Pending staff follow-up", true, false, "FollowUpPending", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("33333333-3333-3333-3333-333333333333"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Child officially enrolled", true, false, "Enrolled", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "EnrolmentStatuses",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Description", "IsActive", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("88888888-8888-8888-8888-888888888888"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Child is officially enrolled", true, false, "Enrolled", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("99999999-9999-9999-9999-999999999999"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Child is on waitlist", true, false, "Waitlisted", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Child has withdrawn", true, false, "Withdrawn", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "FeeTypes",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Description", "IsActive", "IsDeleted", "IsRecurring", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("bbbbbbbb-cccc-dddd-eeee-ffffffffffff"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "One-time enrolment fee", true, false, false, "Registration Fee", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("cccccccc-dddd-eeee-ffff-111111111111"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Recurring monthly tuition fee", true, false, true, "Monthly Tuition", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("dddddddd-eeee-ffff-1111-222222222222"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "One-time uniform purchase fee", true, false, false, "Uniform Fee", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "IsActive", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Male", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("22222222-2222-2222-2222-222222222222"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Female", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Description", "IsActive", "IsDefault", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("77777777-aaaa-bbbb-cccc-888888888888"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "National language of Indonesia", true, true, false, "Bahasa Indonesia", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("99999999-aaaa-bbbb-cccc-000000000000"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "International language", true, false, false, "English", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Chinese language", true, false, false, "Mandarin", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "Relationships",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "Description", "IsActive", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("0b0e35a2-3514-4b74-850a-d84786d7de57"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Legal Guardian or Relative", true, false, "Guardian", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("39ececec-1dc2-4fdf-9776-932807688439"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Biological or Legal Father", true, false, "Father", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("75de722d-d8c4-4ded-85e4-feec33c22992"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, "Biological or Legal Mother", true, false, "Mother", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.InsertData(
                table: "Religions",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "IsActive", "IsDeleted", "Name", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { new Guid("11111111-aaaa-bbbb-cccc-222222222222"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Christianity", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("33333333-aaaa-bbbb-cccc-444444444444"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Hinduism", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("55555555-aaaa-bbbb-cccc-666666666666"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Buddhism", new Guid("00000000-0000-0000-0000-000000000000"), null, null },
                    { new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), new DateTime(2026, 1, 27, 0, 0, 0, 0, DateTimeKind.Utc), null, true, false, "Islam", new Guid("00000000-0000-0000-0000-000000000000"), null, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Citizenships_CountryCode",
                table: "Citizenships",
                column: "CountryCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClassLevels_Name",
                table: "ClassLevels",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EnquiryStatuses_Name",
                table: "EnquiryStatuses",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EnrolmentStatuses_Name",
                table: "EnrolmentStatuses",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FeeTypes_Name",
                table: "FeeTypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Genders_Name",
                table: "Genders",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HealthConditions_Name",
                table: "HealthConditions",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Languages_IsDefault",
                table: "Languages",
                column: "IsDefault");

            migrationBuilder.CreateIndex(
                name: "IX_Languages_Name",
                table: "Languages",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Relationships_Name",
                table: "Relationships",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Religions_Name",
                table: "Religions",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Citizenships");

            migrationBuilder.DropTable(
                name: "ClassLevels");

            migrationBuilder.DropTable(
                name: "EnquiryStatuses");

            migrationBuilder.DropTable(
                name: "EnrolmentStatuses");

            migrationBuilder.DropTable(
                name: "FeeTypes");

            migrationBuilder.DropTable(
                name: "Genders");

            migrationBuilder.DropTable(
                name: "HealthConditions");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "Relationships");

            migrationBuilder.DropTable(
                name: "Religions");
        }
    }
}
