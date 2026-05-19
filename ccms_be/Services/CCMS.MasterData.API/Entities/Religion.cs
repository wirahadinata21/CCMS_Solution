using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.MasterData.API.Entities;

public class Religion : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty; // Contoh: Islam, Kristen, Hindu, dll
}
