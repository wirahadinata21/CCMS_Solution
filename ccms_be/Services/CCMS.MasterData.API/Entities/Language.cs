using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.MasterData.API.Entities;

public class Language : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty; // Contoh: Bahasa Indonesia, Inggris, Mandarin
    public string Description { get; set; } = string.Empty;
    public bool IsDefault { get; set; } = false;
}
