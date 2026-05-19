using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations; // Mengacu pada BaseEntity Anda

namespace CCMS.MasterData.API.Entities;

public class Relationship : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}