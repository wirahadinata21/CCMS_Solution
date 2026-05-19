using CCMS.Enrolment.API.Entities;

namespace CCMS.Enrolment.API.Repository;

public interface IEnrolmentRepository
{
    // Parent Enquiry
    Task<IEnumerable<ParentEnquiry>> GetParentEnquiriesAsync();
    Task<ParentEnquiry?> GetParentEnquiryByIdAsync(Guid id);
    Task AddParentEnquiryAsync(ParentEnquiry enquiry);
    Task UpdateParentEnquiryAsync(ParentEnquiry enquiry);
    Task DeleteParentEnquiryAsync(Guid id);

    // Visit Schedule
    Task<IEnumerable<VisitSchedule>> GetVisitSchedulesAsync(Guid enquiryId);
    Task AddVisitScheduleAsync(VisitSchedule schedule);

    // Waitlist Entry
    Task<WaitlistEntry?> GetWaitlistEntryAsync(Guid enquiryId);
    Task AddWaitlistEntryAsync(WaitlistEntry entry);
}
