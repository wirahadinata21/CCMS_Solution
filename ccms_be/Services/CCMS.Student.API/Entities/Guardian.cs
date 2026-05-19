using CCMS.Core.Domain;

namespace CCMS.Student.API.Entities;

public class Guardian : BaseEntity
{
    public Guid StudentId { get; set; }
    public string Name { get; set; } = null!;
    public string Relationship { get; set; } = null!;
    public string ContactNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool IsEmergencyContact { get; set; } //
}