using CCMS.Enrolment.API.Data;
using CCMS.Enrolment.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CCMS.Enrolment.API.Repository;

public class EnrolmentRepository : IEnrolmentRepository
{
    private readonly EnrolmentDataContext _context;

    public EnrolmentRepository(EnrolmentDataContext context)
    {
        _context = context;
    }

    // Parent Enquiry
    public async Task<IEnumerable<ParentEnquiry>> GetParentEnquiriesAsync()
        => await _context.ParentEnquiries
                         .Include(p => p.VisitSchedules)
                         .Include(p => p.WaitlistEntry)
                         .AsNoTracking()
                         .ToListAsync();

    public async Task<ParentEnquiry?> GetParentEnquiryByIdAsync(Guid id)
        => await _context.ParentEnquiries
                         .Include(p => p.VisitSchedules)
                         .Include(p => p.WaitlistEntry)
                         .FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddParentEnquiryAsync(ParentEnquiry enquiry)
    {
        _context.ParentEnquiries.Add(enquiry);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateParentEnquiryAsync(ParentEnquiry enquiry)
    {
        _context.ParentEnquiries.Update(enquiry);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteParentEnquiryAsync(Guid id)
    {
        var entity = await _context.ParentEnquiries.FindAsync(id);
        if (entity != null)
        {
            _context.ParentEnquiries.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    // Visit Schedule
    public async Task<IEnumerable<VisitSchedule>> GetVisitSchedulesAsync(Guid enquiryId)
        => await _context.VisitSchedules
                         .Where(v => v.ParentEnquiryId == enquiryId)
                         .AsNoTracking()
                         .ToListAsync();

    public async Task AddVisitScheduleAsync(VisitSchedule schedule)
    {
        _context.VisitSchedules.Add(schedule);
        await _context.SaveChangesAsync();
    }

    // Waitlist Entry
    public async Task<WaitlistEntry?> GetWaitlistEntryAsync(Guid enquiryId)
        => await _context.WaitlistEntries
                         .FirstOrDefaultAsync(w => w.ParentEnquiryId == enquiryId);

    public async Task AddWaitlistEntryAsync(WaitlistEntry entry)
    {
        _context.WaitlistEntries.Add(entry);
        await _context.SaveChangesAsync();
    }
}
