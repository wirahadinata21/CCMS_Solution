using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CCMS.Enrolment.API.Migrations
{
    /// <inheritdoc />
    public partial class InitEnrolmentPostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParentEnquiries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ParentName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    ChildName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PreferredStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CentreName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    EnquiryStatusId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnquiryStatusName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    StatusChangedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    StatusChangedBy = table.Column<string>(type: "text", nullable: true),
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
                    table.PrimaryKey("PK_ParentEnquiries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VisitSchedules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ParentEnquiryId = table.Column<Guid>(type: "uuid", nullable: false),
                    VisitDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AssignedStaff = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
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
                    table.PrimaryKey("PK_VisitSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VisitSchedules_ParentEnquiries_ParentEnquiryId",
                        column: x => x.ParentEnquiryId,
                        principalTable: "ParentEnquiries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WaitlistEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ParentEnquiryId = table.Column<Guid>(type: "uuid", nullable: false),
                    PriorityNote = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    WaitlistedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PromotedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
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
                    table.PrimaryKey("PK_WaitlistEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WaitlistEntries_ParentEnquiries_ParentEnquiryId",
                        column: x => x.ParentEnquiryId,
                        principalTable: "ParentEnquiries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ParentEnquiries",
                columns: new[] { "Id", "CentreName", "ChildName", "CreatedAt", "CreatedBy", "DateOfBirth", "Email", "EnquiryStatusId", "EnquiryStatusName", "IsActive", "IsDeleted", "Notes", "ParentName", "Phone", "PreferredStartDate", "StatusChangedAt", "StatusChangedBy", "TenantId", "UpdatedAt", "UpdatedBy" },
                values: new object[] { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), "Jakarta Centre", "Jane Doe", new DateTime(2026, 1, 31, 10, 0, 0, 0, DateTimeKind.Utc), null, new DateTime(2021, 5, 10, 0, 0, 0, 0, DateTimeKind.Utc), "john@example.com", new Guid("77777777-7777-7777-7777-777777777777"), "New", true, false, "Initial enquiry", "John Doe", "08123456789", new DateTime(2026, 3, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, new Guid("00000000-0000-0000-0000-000000000000"), null, null });

            migrationBuilder.InsertData(
                table: "VisitSchedules",
                columns: new[] { "Id", "AssignedStaff", "CreatedAt", "CreatedBy", "IsActive", "IsDeleted", "ParentEnquiryId", "Status", "TenantId", "UpdatedAt", "UpdatedBy", "VisitDate" },
                values: new object[] { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), "Staff A", new DateTime(2026, 1, 31, 10, 0, 0, 0, DateTimeKind.Utc), null, true, false, new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), 0, new Guid("00000000-0000-0000-0000-000000000000"), null, null, new DateTime(2026, 2, 7, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.InsertData(
                table: "WaitlistEntries",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "IsActive", "IsDeleted", "ParentEnquiryId", "PriorityNote", "PromotedAt", "TenantId", "UpdatedAt", "UpdatedBy", "WaitlistedAt" },
                values: new object[] { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), new DateTime(2026, 1, 31, 10, 0, 0, 0, DateTimeKind.Utc), null, true, false, new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), "High priority - sibling already enrolled", null, new Guid("00000000-0000-0000-0000-000000000000"), null, null, new DateTime(2026, 1, 31, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.CreateIndex(
                name: "IX_VisitSchedules_ParentEnquiryId",
                table: "VisitSchedules",
                column: "ParentEnquiryId");

            migrationBuilder.CreateIndex(
                name: "IX_WaitlistEntries_ParentEnquiryId",
                table: "WaitlistEntries",
                column: "ParentEnquiryId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VisitSchedules");

            migrationBuilder.DropTable(
                name: "WaitlistEntries");

            migrationBuilder.DropTable(
                name: "ParentEnquiries");
        }
    }
}
