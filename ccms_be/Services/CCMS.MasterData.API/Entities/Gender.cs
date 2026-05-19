using CCMS.Core.Domain; // Mengacu pada BaseEntity Anda di BuildingBlocks

namespace CCMS.MasterData.API.Entities;

public class Gender : BaseEntity
{
    public string Name { get; set; } = string.Empty;
}