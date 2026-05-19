using CCMS.Enrolment.API.Entities;

namespace CCMS.Enrolment.API.DTOs;

public record VisitScheduleRequest(
    Guid ParentEnquiryId,
    DateTime VisitDate,
    string AssignedStaff,
    VisitStatus Status = VisitStatus.Scheduled
);
