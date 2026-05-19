namespace CCMS.Enrolment.API.DTOs;

public record WaitlistEntryRequest(
    Guid ParentEnquiryId,
    string? PriorityNote
);
