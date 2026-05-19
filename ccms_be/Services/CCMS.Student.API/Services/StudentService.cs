using CCMS.Student.API.Data;
using CCMS.Student.API.DTOs;
using CCMS.Student.API.Mappers;
using Microsoft.EntityFrameworkCore;
// Alias untuk menghindari konflik namespace 'Student'
using StudentEntity = CCMS.Student.API.Entities.Student;

namespace CCMS.Student.API.Services;

public class StudentService : IStudentService
{
    private readonly StudentDbContext _context;

    public StudentService(StudentDbContext context)
    {
        _context = context;
    }

    // 1. Fungsi untuk mengambil semua murid aktif
    public async Task<IEnumerable<StudentResponse>> GetAllActiveStudentsAsync()
    {
        var students = await _context.Students
            .Include(s => s.Guardians) // Pastikan wali ikut terbaca
            .Where(s => !s.IsDeleted)
            .ToListAsync();

        return students.Select(s => StudentMapper.ToResponse(s));
    }

    // 2. Fungsi untuk mengambil satu murid berdasarkan ID
    public async Task<StudentResponse?> GetStudentByIdAsync(Guid id)
    {
        var student = await _context.Students
            .Include(s => s.Guardians) // Menarik data dari tabel Guardians
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        return student != null ? StudentMapper.ToResponse(student) : null;
    }

    // 3. Tambahkan fungsi ini untuk memperbaiki error CS0535

    public async Task<StudentResponse> CreateStudentAsync(StudentRequest request)
    {
        var student = new StudentEntity
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName,
            NRIC_FIN = request.NRIC_FIN,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            Citizenship = request.Citizenship,
            AllergyInfo = request.AllergyInfo,
            MedicalInstructions = request.MedicalInstructions,
            EnrolmentStatus = "Active",
            CreatedAt = DateTime.UtcNow,
            // Map Guardians dari request ke Entity
            Guardians = request.Guardians.Select(g => new CCMS.Student.API.Entities.Guardian
            {
                Id = Guid.NewGuid(),
                Name = g.Name,
                Relationship = g.Relationship,
                ContactNumber = g.ContactNumber,
                Email = g.Email,
                IsEmergencyContact = g.IsEmergencyContact
            }).ToList()
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return student.ToResponse();
    }

    public async Task<bool> UpdateStudentAsync(Guid id, StudentRequest request)
    {
        var student = await _context.Students
            .Include(s => s.Guardians)
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        if (student == null) return false;

        // 1. Update data utama murid
        student.FullName = request.FullName;
        student.NRIC_FIN = request.NRIC_FIN;
        student.DateOfBirth = request.DateOfBirth;
        student.Gender = request.Gender;
        student.Citizenship = request.Citizenship;
        student.AllergyInfo = request.AllergyInfo;
        student.MedicalInstructions = request.MedicalInstructions;

        // 2. Update data wali (Guardians)
        // Untuk menyederhanakan, kita hapus yang lama dan masukkan yang baru dari request
        _context.Guardians.RemoveRange(student.Guardians);

        student.Guardians = request.Guardians.Select(g => new CCMS.Student.API.Entities.Guardian
        {
            Id = Guid.NewGuid(),
            StudentId = id,
            Name = g.Name,
            Relationship = g.Relationship,
            ContactNumber = g.ContactNumber,
            Email = g.Email,
            IsEmergencyContact = g.IsEmergencyContact
        }).ToList();

        return await _context.SaveChangesAsync() > 0;
    }
}