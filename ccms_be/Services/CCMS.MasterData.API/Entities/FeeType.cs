using CCMS.Core.Domain;

namespace CCMS.MasterData.API.Entities;

public class FeeType : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Contoh: Uang Pendaftaran, SPP, Seragam
    public string? Description { get; set; }
    public bool IsRecurring { get; set; } = false; // True untuk SPP bulanan
}
