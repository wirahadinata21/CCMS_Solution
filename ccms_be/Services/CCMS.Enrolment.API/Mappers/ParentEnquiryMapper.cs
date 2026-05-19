using CCMS.Enrolment.API.Entities;
using CCMS.Enrolment.API.DTOs;

namespace CCMS.Enrolment.API.Mappers;

public static class ParentEnquiryMapper
{
    // Request → Entity
    public static ParentEnquiry ToEntity(this ParentEnquiryRequest request, string createdBy)
    {
        return new ParentEnquiry
        {
            ParentName = request.ParentName,
            ChildName = request.ChildName,
            PreferredStartDate = request.PreferredStartDate,
            CentreName = request.CentreName,
            Notes = request.Notes,
            Email = request.Email,
            Phone = request.Phone,
            DateOfBirth = request.DateOfBirth,
            EnquiryStatusId = request.EnquiryStatusId,
            EnquiryStatusName = request.EnquiryStatusName ?? string.Empty, // simpan nama status
            CreatedBy = createdBy,
            CreatedAt = DateTime.UtcNow
        };
    }

    // Update Request → Entity (untuk PUT)
    public static void UpdateEntity(this ParentEnquiry enquiry, ParentEnquiryRequest request, string updatedBy)
    {
        enquiry.ParentName = request.ParentName;
        enquiry.ChildName = request.ChildName;
        enquiry.PreferredStartDate = request.PreferredStartDate;
        enquiry.CentreName = request.CentreName;
        enquiry.Notes = request.Notes;
        enquiry.Email = request.Email;
        enquiry.Phone = request.Phone;
        enquiry.DateOfBirth = request.DateOfBirth;
        enquiry.EnquiryStatusId = request.EnquiryStatusId;
        enquiry.EnquiryStatusName = request.EnquiryStatusName ?? enquiry.EnquiryStatusName;
        enquiry.UpdatedBy = updatedBy;
        enquiry.UpdatedAt = DateTime.UtcNow;
        enquiry.StatusChangedAt = DateTime.UtcNow;
        enquiry.StatusChangedBy = updatedBy;
    }

    public static ParentEnquiryResponse ToResponse(this ParentEnquiry enquiry)
    {
        return new ParentEnquiryResponse(
            Id: enquiry.Id,
            ParentName: enquiry.ParentName,
            ChildName: enquiry.ChildName,
            PreferredStartDate: enquiry.PreferredStartDate,
            CentreName: enquiry.CentreName,
            EnquiryStatusId: enquiry.EnquiryStatusId,
            EnquiryStatusName: enquiry.EnquiryStatusName,
            Notes: enquiry.Notes,
            enquiry.Email, // ✅ tambahkan
            enquiry.Phone, // ✅ tambahkan
            enquiry.DateOfBirth, // ✅ tambahkan
            CreatedAt: enquiry.CreatedAt,
            StatusChangedAt: enquiry.StatusChangedAt,
            StatusChangedBy: enquiry.StatusChangedBy,
            VisitSchedules: enquiry.VisitSchedules.Select(v => new VisitScheduleDto(
                v.Id,
                v.VisitDate,
                v.AssignedStaff,
                v.Status
            )).ToList(),
            WaitlistEntry: enquiry.WaitlistEntry is not null
                ? new WaitlistEntryDto(
                    enquiry.WaitlistEntry.Id,
                    enquiry.WaitlistEntry.PriorityNote,
                    enquiry.WaitlistEntry.WaitlistedAt,
                    enquiry.WaitlistEntry.PromotedAt
                )
                : null
        );
    }

}
