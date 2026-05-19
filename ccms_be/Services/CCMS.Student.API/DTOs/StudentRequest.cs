namespace CCMS.Student.API.DTOs;

public record StudentRequest(
    string FullName,
    string NRIC_FIN,
    DateTime DateOfBirth,
    string Gender,
    string Citizenship,
    string? AllergyInfo,
    string? MedicalInstructions,
    // Tambahkan baris di bawah ini agar error di StudentService hilang
    List<GuardianRequest> Guardians
);
public record GuardianRequest(
    string Name,
    string Relationship,
    string ContactNumber,
    string Email,
    bool IsEmergencyContact
);