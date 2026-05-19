namespace CCMS.Student.API.Mappers;

public static class StudentMapper
{
    // Gunakan full path agar tidak ada keraguan bagi compiler
    public static DTOs.StudentResponse ToResponse(this Entities.Student student)
    {
        return new DTOs.StudentResponse(
            student.Id,
            student.FullName,
            student.NRIC_FIN,
            student.ClassAssignment ?? "Unassigned",
            student.EnrolmentStatus,
            student.SubsidyType,
            student.Guardians.Select(g => new DTOs.GuardianDto(
                g.Name,
                g.Relationship,
                g.ContactNumber,
                g.IsEmergencyContact)).ToList()
        );
    }
}