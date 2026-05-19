using CCMS.Core.Domain; // Menggunakan BaseEntity yang kita buat tadi

namespace CCMS.Student.API.Entities;

public class Student : BaseEntity
{
    public string FullName { get; set; } = null!;
    public string NRIC_FIN { get; set; } = null!; // ECDA-required
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; } = null!;
    public string Citizenship { get; set; } = null!; //

    // Status & Akademik
    public string EnrolmentStatus { get; set; } = "Active"; //
    public string? ClassAssignment { get; set; } //

    // Finance & Subsidy
    public string SubsidyType { get; set; } = "None";

    // Health
    public string? AllergyInfo { get; set; }
    public string? MedicalInstructions { get; set; }
    public string? VaccinationStatus { get; set; }

    // Relasi ke Wali
    public List<Guardian> Guardians { get; set; } = new();
}