using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.MasterData.API.Entities;

public class ClassLevel : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty; // Contoh: "Toddler", "Playgroup", "TK A", "TK B"
    public int MinAgeMonths { get; set; } // Usia minimum dalam bulan
    public int MaxAgeMonths { get; set; } // Usia maksimum dalam bulan
    public string? Description { get; set; }
}
