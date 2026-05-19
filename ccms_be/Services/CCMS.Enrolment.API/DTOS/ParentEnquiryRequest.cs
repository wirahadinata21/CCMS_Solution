using CCMS.Enrolment.API.Entities;

namespace CCMS.Enrolment.API.DTOs;

public record ParentEnquiryRequest(
    string ParentName,
    string ChildName,
    DateTime PreferredStartDate,
    string CentreName,
    string? Notes,
    Guid EnquiryStatusId,        // hanya simpan GUID, bukan FK
    string EnquiryStatusName,     // simpan nama status untuk display
    string? Email,          // baru
    string? Phone,          // baru
    DateTime? DateOfBirth   // baru
);
