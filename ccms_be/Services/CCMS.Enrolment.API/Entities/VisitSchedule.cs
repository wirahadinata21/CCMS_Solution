using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.Enrolment.API.Entities;

public class VisitSchedule : BaseEntity
{
    // Foreign key ke ParentEnquiry
    [Required]
    public Guid ParentEnquiryId { get; set; }

    // Tanggal kunjungan
    [Required]
    public DateTime VisitDate { get; set; }

    // Staff yang ditugaskan
    [MaxLength(100)]
    public string AssignedStaff { get; set; } = string.Empty;

    // Status kunjungan (enum)
    [Required]
    public VisitStatus Status { get; set; } = VisitStatus.Scheduled;

    // Navigation property
    public ParentEnquiry? ParentEnquiry { get; set; }
}
