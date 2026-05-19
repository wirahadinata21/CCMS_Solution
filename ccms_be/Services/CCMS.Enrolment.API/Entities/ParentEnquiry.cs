using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.Enrolment.API.Entities;

public class ParentEnquiry : BaseEntity
{
    // Data orang tua
    [Required]
    [MaxLength(200)]
    public string ParentName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Phone { get; set; } = string.Empty;

    // Data anak
    [Required]
    [MaxLength(200)]
    public string ChildName { get; set; } = string.Empty;

    public DateTime? DateOfBirth { get; set; }

    // Preferensi enrolment
    public DateTime PreferredStartDate { get; set; }

    [MaxLength(200)]
    public string CentreName { get; set; } = string.Empty;

    // Status enquiry (disimpan langsung tanpa relasi ke MasterData)
    [Required]
    public Guid EnquiryStatusId { get; set; }

    [MaxLength(100)]
    public string EnquiryStatusName { get; set; } = string.Empty;

    // Catatan tambahan
    public string? Notes { get; set; }

    // Audit status perubahan
    public DateTime? StatusChangedAt { get; set; }
    public string? StatusChangedBy { get; set; }

    // Navigation properties
    public ICollection<VisitSchedule> VisitSchedules { get; set; } = new List<VisitSchedule>();
    public WaitlistEntry? WaitlistEntry { get; set; }
}
