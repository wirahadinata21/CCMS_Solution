using CCMS.Enrolment.API.Entities;

namespace CCMS.Enrolment.API.DTOs;

public record ParentEnquiryResponse(
    Guid Id,
    string ParentName,
    string ChildName,
    DateTime PreferredStartDate,
    string CentreName,
    Guid EnquiryStatusId,       // foreign key
    string EnquiryStatusName,   // diisi dari MasterData join
    string? Notes,
    string? Email,             // baru
    string? Phone,             // baru
    DateTime? DateOfBirth,     // baru
    DateTime CreatedAt,
    DateTime? StatusChangedAt,
    string? StatusChangedBy,
    List<VisitScheduleDto> VisitSchedules,
    WaitlistEntryDto? WaitlistEntry
);

public record VisitScheduleDto(
    Guid Id,
    DateTime VisitDate,
    string AssignedStaff,
    VisitStatus Status
);

public record WaitlistEntryDto(
    Guid Id,
    string? PriorityNote,
    DateTime WaitlistedAt,
    DateTime? PromotedAt
);
