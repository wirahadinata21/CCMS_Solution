using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.MasterData.API.Entities;

public class Citizenship : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string CountryCode { get; set; } = string.Empty; // Contoh: SG, ID, MY
}