using CCMS.Enrolment.API.Entities;
using CCMS.Enrolment.API.DTOs;

namespace CCMS.Enrolment.API.Mappers;

public static class VisitScheduleMapper
{
    // Request → Entity
    public static VisitSchedule ToEntity(this VisitScheduleRequest request, string createdBy)
    {
        return new VisitSchedule
        {
            ParentEnquiryId = request.ParentEnquiryId,
            VisitDate = request.VisitDate,
            AssignedStaff = request.AssignedStaff,
            Status = request.Status,
            CreatedBy = createdBy,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };
    }

    // Entity → Response
    public static VisitScheduleDto ToResponse(this VisitSchedule schedule)
    {
        return new VisitScheduleDto(
            schedule.Id,
            schedule.VisitDate,
            schedule.AssignedStaff,
            schedule.Status
        );
    }
}
