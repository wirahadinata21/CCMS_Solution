namespace CCMS.Student.API.DTOs;

public record StudentResponse(
    Guid Id,
    string FullName,
    string NRIC_FIN,
    string ClassAssignment,
    string EnrolmentStatus,
    string SubsidyType,
    List<GuardianDto> Guardians // Parameter ke-7
);

public record GuardianDto(
    string Name,
    string Relationship,
    string ContactNumber,
    bool IsEmergency
);