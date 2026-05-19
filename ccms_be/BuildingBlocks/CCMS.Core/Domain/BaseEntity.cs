using System.ComponentModel.DataAnnotations;

namespace CCMS.Core.Domain; // Pastikan namespace ini persis sama dengan yang di-import

public abstract class BaseEntity
{
    [Key] // Primary Key untuk semua turunan
    //public Guid Id { get; set; } = Guid.NewGuid();
    public Guid Id { get; set; }

    public Guid TenantId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public bool IsDeleted { get; set; } = false;
    public bool IsActive { get; set; } = true;
}