using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.MasterData.API.Entities;

public class HealthCondition : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty; // Contoh: Alergi susu, Asma, Autisme
    public string? Notes { get; set; }
}
