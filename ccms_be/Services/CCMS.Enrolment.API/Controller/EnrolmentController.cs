using CCMS.Enrolment.API.DTOs;
using CCMS.Enrolment.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CCMS.Enrolment.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrolmentController : ControllerBase
{
    private readonly IEnrolmentService _enrolmentService;

    public EnrolmentController(IEnrolmentService enrolmentService)
    {
        _enrolmentService = enrolmentService;
    }

    // -------------------- Parent Enquiry --------------------

    [HttpGet("enquiries")]
    public async Task<IActionResult> GetAllEnquiries()
    {
        var result = await _enrolmentService.GetAllParentEnquiriesAsync();
        return Ok(result);
    }

    [HttpGet("enquiries/{id}")]
    public async Task<IActionResult> GetEnquiryById(Guid id)
    {
        var enquiry = await _enrolmentService.GetParentEnquiryByIdAsync(id);
        if (enquiry == null) return NotFound();
        return Ok(enquiry);
    }

    [HttpPost("enquiries")]
    public async Task<IActionResult> CreateEnquiry([FromBody] ParentEnquiryRequest request)
    {
        var createdBy = User.Identity?.Name ?? "system";
        var enquiry = await _enrolmentService.CreateParentEnquiryAsync(request, createdBy);
        return CreatedAtAction(nameof(GetEnquiryById), new { id = enquiry.Id }, enquiry);
    }

    [HttpPut("enquiries/{id}")]
    public async Task<IActionResult> UpdateEnquiry(Guid id, [FromBody] ParentEnquiryRequest request)
    {
        var updatedBy = User.Identity?.Name ?? "system";
        var enquiry = await _enrolmentService.UpdateParentEnquiryAsync(id, request, updatedBy);
        if (enquiry == null) return NotFound();
        return Ok(enquiry);
    }

    // Soft delete → flag IsDeleted = true
    [HttpDelete("enquiries/{id}")]
    public async Task<IActionResult> SoftDeleteEnquiry(Guid id)
    {
        var deletedBy = User.Identity?.Name ?? "system";
        var deleted = await _enrolmentService.SoftDeleteParentEnquiryAsync(id, deletedBy);
        if (!deleted) return NotFound();
        return NoContent();
    }

    // -------------------- Visit Schedule --------------------

    [HttpGet("enquiries/{enquiryId}/visit-schedules")]
    public async Task<IActionResult> GetVisitSchedules(Guid enquiryId)
    {
        var schedules = await _enrolmentService.GetVisitSchedulesAsync(enquiryId);
        return Ok(schedules);
    }

    [HttpPost("enquiries/{enquiryId}/visit-schedules")]
    public async Task<IActionResult> CreateVisitSchedule(Guid enquiryId, [FromBody] VisitScheduleRequest request)
    {
        var createdBy = User.Identity?.Name ?? "system";
        request = request with { ParentEnquiryId = enquiryId };
        var schedule = await _enrolmentService.CreateVisitScheduleAsync(request, createdBy);
        return Ok(schedule);
    }

    // -------------------- Waitlist Entry --------------------

    [HttpGet("enquiries/{enquiryId}/waitlist-entry")]
    public async Task<IActionResult> GetWaitlistEntry(Guid enquiryId)
    {
        var entry = await _enrolmentService.GetWaitlistEntryAsync(enquiryId);
        if (entry == null) return NotFound();
        return Ok(entry);
    }

    [HttpPost("enquiries/{enquiryId}/waitlist-entry")]
    public async Task<IActionResult> CreateWaitlistEntry(Guid enquiryId, [FromBody] WaitlistEntryRequest request)
    {
        var createdBy = User.Identity?.Name ?? "system";
        request = request with { ParentEnquiryId = enquiryId };
        var entry = await _enrolmentService.CreateWaitlistEntryAsync(request, createdBy);
        return Ok(entry);
    }

    // -------------------- Update Enquiry Status --------------------
    [HttpPut("enquiries/{id}/status")]
    public async Task<IActionResult> UpdateEnquiryStatus(Guid id, [FromBody] UpdateEnquiryStatusDto request)
    {
        if (string.IsNullOrWhiteSpace(request.EnquiryStatusName))
            return BadRequest("Status name is required.");

        var updatedBy = User.Identity?.Name ?? "system";
        var success = await _enrolmentService.UpdateParentEnquiryStatusAsync(id, request.EnquiryStatusName, updatedBy);

        if (!success) return NotFound();

        return Ok(new { message = "Enquiry status updated successfully" });
    }

}
