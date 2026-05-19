using CCMS.Core.Domain; // Mengacu pada BaseEntity Anda

namespace CCMS.MasterData.API.Entities;

public class EnrolmentStatus : BaseEntity
{
   public string Name { get; set; } = string.Empty;
   public string Description { get; set; } = string.Empty;
}
