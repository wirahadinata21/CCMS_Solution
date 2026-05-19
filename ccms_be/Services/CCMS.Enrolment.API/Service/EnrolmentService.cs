using CCMS.Enrolment.API.DTOs;
using CCMS.Enrolment.API.Entities;
using CCMS.Enrolment.API.Mappers;
using CCMS.Enrolment.API.Repository;

namespace CCMS.Enrolment.API.Services;

public class EnrolmentService : IEnrolmentService
{
    private readonly IEnrolmentRepository _repository;

    public EnrolmentService(IEnrolmentRepository repository)
    {
        _repository = repository;
    }

    // -------------------- Parent Enquiry --------------------

    public async Task<IEnumerable<ParentEnquiryResponse>> GetAllParentEnquiriesAsync()
    {
        var enquiries = await _repository.GetParentEnquiriesAsync();
        return enquiries.Select(e => e.ToResponse());
    }

    public async Task<ParentEnquiryResponse?> GetParentEnquiryByIdAsync(Guid id)
    {
        var enquiry = await _repository.GetParentEnquiryByIdAsync(id);
        return enquiry?.ToResponse();
    }

    public async Task<ParentEnquiryResponse> CreateParentEnquiryAsync(ParentEnquiryRequest request, string createdBy)
    {
        var entity = request.ToEntity(createdBy);
        await _repository.AddParentEnquiryAsync(entity);
        return entity.ToResponse();
    }

    public async Task<ParentEnquiryResponse?> UpdateParentEnquiryAsync(Guid id, ParentEnquiryRequest request, string updatedBy)
    {
        var enquiry = await _repository.GetParentEnquiryByIdAsync(id);
        if (enquiry == null) return null;

        enquiry.UpdateEntity(request, updatedBy);
        await _repository.UpdateParentEnquiryAsync(enquiry);
        return enquiry.ToResponse();
    }

    // Soft delete → flag IsDeleted = true
    public async Task<bool> SoftDeleteParentEnquiryAsync(Guid id, string deletedBy)
    {
        var enquiry = await _repository.GetParentEnquiryByIdAsync(id);
        if (enquiry == null) return false;

        enquiry.IsDeleted = true;
        enquiry.UpdatedBy = deletedBy;
        enquiry.UpdatedAt = DateTime.UtcNow;
        enquiry.StatusChangedAt = DateTime.UtcNow;
        enquiry.StatusChangedBy = deletedBy;

        await _repository.UpdateParentEnquiryAsync(enquiry);
        return true;
    }

    // -------------------- Visit Schedule --------------------

    public async Task<IEnumerable<VisitScheduleDto>> GetVisitSchedulesAsync(Guid enquiryId)
    {
        var schedules = await _repository.GetVisitSchedulesAsync(enquiryId);
        return schedules.Select(v => v.ToResponse());
    }

    public async Task<VisitScheduleDto> CreateVisitScheduleAsync(VisitScheduleRequest request, string createdBy)
    {
        var entity = request.ToEntity(createdBy);
        await _repository.AddVisitScheduleAsync(entity);
        return entity.ToResponse();
    }

    // -------------------- Waitlist Entry --------------------

    public async Task<WaitlistEntryDto?> GetWaitlistEntryAsync(Guid enquiryId)
    {
        var entry = await _repository.GetWaitlistEntryAsync(enquiryId);
        return entry?.ToResponse();
    }

    public async Task<WaitlistEntryDto> CreateWaitlistEntryAsync(WaitlistEntryRequest request, string createdBy)
    {
        var entity = request.ToEntity(createdBy);   // ini harus return WaitlistEntry
        await _repository.AddWaitlistEntryAsync(entity);
        return entity.ToResponse();                 // ini akan return WaitlistEntryDto
    }

    public async Task<bool> UpdateParentEnquiryStatusAsync(Guid enquiryId, string newStatus, string updatedBy)
    {
        var enquiry = await _repository.GetParentEnquiryByIdAsync(enquiryId);
        if (enquiry == null) return false;

        enquiry.EnquiryStatusName = newStatus;
        enquiry.UpdatedBy = updatedBy;
        enquiry.UpdatedAt = DateTime.UtcNow;
        enquiry.StatusChangedAt = DateTime.UtcNow;
        enquiry.StatusChangedBy = updatedBy;

        await _repository.UpdateParentEnquiryAsync(enquiry);
        return true;
    }

}
