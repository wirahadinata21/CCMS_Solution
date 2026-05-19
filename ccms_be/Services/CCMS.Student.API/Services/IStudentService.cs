using CCMS.Student.API.DTOs;

namespace CCMS.Student.API.Services;

public interface IStudentService
{
    Task<IEnumerable<StudentResponse>> GetAllActiveStudentsAsync();
    Task<StudentResponse?> GetStudentByIdAsync(Guid id);
    Task<StudentResponse> CreateStudentAsync(StudentRequest request);
    Task<bool> UpdateStudentAsync(Guid id, StudentRequest request);
}