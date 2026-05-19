namespace CCMS.MasterData.API.DTOs;

public class ReferenceResponse
{
    public Guid Id { get; set; } // Gunakan Guid jika BaseEntity Anda menggunakan Guid
    public string Name { get; set; } = string.Empty;
}