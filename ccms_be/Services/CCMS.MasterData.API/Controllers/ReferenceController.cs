using CCMS.MasterData.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CCMS.MasterData.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReferenceController : ControllerBase
{
    private readonly IReferenceService _referenceService;

    public ReferenceController(IReferenceService referenceService)
    {
        _referenceService = referenceService;
    }

    [HttpGet("genders")]
    public async Task<IActionResult> GetGenders()
    {
        var result = await _referenceService.GetAllGendersAsync();
        return Ok(result);
    }

    [HttpGet("citizenships")]
    public async Task<IActionResult> GetCitizenships()
    {
        var result = await _referenceService.GetAllCitizenshipsAsync();
        return Ok(result);
    }

    [HttpGet("relationships")]
    public async Task<IActionResult> GetRelationships()
    {
        var result = await _referenceService.GetAllRelationshipsAsync();
        return Ok(result);
    }

    [HttpGet("enrolment-statuses")]
    public async Task<IActionResult> GetEnrolmentStatuses()
    {
        var statuses = await _referenceService.GetEnrolmentStatusesAsync(); 
        return Ok(statuses);
    }
    // Tambahan baru
    [HttpGet("class-levels")] 
    public async Task<IActionResult> GetClassLevels() 
    { 
        var result = await _referenceService.GetAllClassLevelsAsync(); return Ok(result); 
    } 

    [HttpGet("religions")] 
    public async Task<IActionResult> GetReligions() 
    { 
        var result = await _referenceService.GetAllReligionsAsync(); return Ok(result); 
    } 

    [HttpGet("languages")] 
    public async Task<IActionResult> GetLanguages() 
    { 
        var result = await _referenceService.GetAllLanguagesAsync(); return Ok(result); 
    }
    
    [HttpGet("fee-types")] 
    public async Task<IActionResult> GetFeeTypes() 
    { 
        var result = await _referenceService.GetAllFeeTypesAsync(); return Ok(result); 
    }
}