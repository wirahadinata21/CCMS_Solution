using CCMS.Core.Domain;
using System.ComponentModel.DataAnnotations;

namespace CCMS.MasterData.API.Entities;

public class EnquiryStatus : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}
