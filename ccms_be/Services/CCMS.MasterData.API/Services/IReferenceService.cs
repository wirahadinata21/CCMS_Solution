using CCMS.MasterData.API.DTOs;

namespace CCMS.MasterData.API.Services;

public interface IReferenceService
{
    Task<IEnumerable<ReferenceResponse>> GetAllGendersAsync();
    Task<IEnumerable<ReferenceResponse>> GetAllCitizenshipsAsync();
    Task<IEnumerable<ReferenceResponse>> GetAllRelationshipsAsync();
    Task<IEnumerable<ReferenceResponse>> GetEnrolmentStatusesAsync();
    // Tambahan baru
    Task<IEnumerable<ReferenceResponse>> GetAllClassLevelsAsync(); 
    Task<IEnumerable<ReferenceResponse>> GetAllReligionsAsync(); 
    Task<IEnumerable<ReferenceResponse>> GetAllLanguagesAsync(); 
    Task<IEnumerable<ReferenceResponse>> GetAllFeeTypesAsync();
}