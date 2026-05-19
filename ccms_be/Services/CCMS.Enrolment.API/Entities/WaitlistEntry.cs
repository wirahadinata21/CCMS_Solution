using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.Enrolment.API.Entities;

public class WaitlistEntry : BaseEntity
{
    // Foreign key ke ParentEnquiry (one-to-one)
    [Required]
    public Guid ParentEnquiryId { get; set; }

    // Catatan prioritas (opsional)
    [MaxLength(500)]
    public string? PriorityNote { get; set; }

    // Tanggal masuk waitlist
    [Required]
    public DateTime WaitlistedAt { get; set; } = DateTime.UtcNow;

    // Tanggal dipromosikan dari waitlist (opsional)
    public DateTime? PromotedAt { get; set; }

    // Navigation property
    public ParentEnquiry? ParentEnquiry { get; set; }
}
