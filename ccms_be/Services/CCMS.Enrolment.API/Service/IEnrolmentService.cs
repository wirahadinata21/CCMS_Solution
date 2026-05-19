using CCMS.Enrolment.API.DTOs;

namespace CCMS.Enrolment.API.Services;

public interface IEnrolmentService
{
    // Parent Enquiry
    Task<IEnumerable<ParentEnquiryResponse>> GetAllParentEnquiriesAsync();
    Task<ParentEnquiryResponse?> GetParentEnquiryByIdAsync(Guid id);
    Task<ParentEnquiryResponse> CreateParentEnquiryAsync(ParentEnquiryRequest request, string createdBy);
    Task<ParentEnquiryResponse?> UpdateParentEnquiryAsync(Guid id, ParentEnquiryRequest request, string updatedBy);
    Task<bool> SoftDeleteParentEnquiryAsync(Guid id, string deletedBy); // ✅ ganti delete → soft delete

    // Visit Schedule
    Task<IEnumerable<VisitScheduleDto>> GetVisitSchedulesAsync(Guid enquiryId);
    Task<VisitScheduleDto> CreateVisitScheduleAsync(VisitScheduleRequest request, string createdBy);

    // Waitlist Entry
    Task<WaitlistEntryDto?> GetWaitlistEntryAsync(Guid enquiryId);
    Task<WaitlistEntryDto> CreateWaitlistEntryAsync(WaitlistEntryRequest request, string createdBy);

    //
    Task<bool> UpdateParentEnquiryStatusAsync(Guid enquiryId, string newStatus, string updatedBy);
}
