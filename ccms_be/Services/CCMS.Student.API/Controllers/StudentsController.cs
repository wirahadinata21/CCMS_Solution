using Microsoft.AspNetCore.Mvc;
using CCMS.Student.API.Services;
using CCMS.Student.API.DTOs;

namespace CCMS.Student.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _studentService.GetAllActiveStudentsAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var student = await _studentService.GetStudentByIdAsync(id);
        return student == null ? NotFound() : Ok(student);
    }

    [HttpPost]
    public async Task<IActionResult> Create(StudentRequest request)
    {
        // Memastikan data NRIC dan kesehatan murid diproses
        var result = await _studentService.CreateStudentAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, StudentRequest request)
    {
        var success = await _studentService.UpdateStudentAsync(id, request);

        if (!success) return NotFound();

        return NoContent(); // Status 204 jika berhasil
    }
}