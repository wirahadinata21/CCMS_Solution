using CCMS.Enrolment.API.Entities;
using CCMS.Enrolment.API.DTOs;

namespace CCMS.Enrolment.API.Mappers;

public static class WaitlistEntryMapper
{
    // Request → Entity
    public static WaitlistEntry ToEntity(this WaitlistEntryRequest request, string createdBy)
    {
        return new WaitlistEntry
        {
            ParentEnquiryId = request.ParentEnquiryId,
            PriorityNote = request.PriorityNote,
            WaitlistedAt = DateTime.UtcNow,
            CreatedBy = createdBy,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };
    }

    // Entity → Response
    public static WaitlistEntryDto ToResponse(this WaitlistEntry entry)
    {
        return new WaitlistEntryDto(
            entry.Id,
            entry.PriorityNote,
            entry.WaitlistedAt,
            entry.PromotedAt
        );
    }
}
