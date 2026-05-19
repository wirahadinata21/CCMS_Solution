using AutoMapper;
using CCMS.MasterData.API.Repository;
using CCMS.MasterData.API.DTOs;

namespace CCMS.MasterData.API.Services;

public class ReferenceService : IReferenceService
{
    private readonly IReferenceRepository _repository;
    private readonly IMapper _mapper;

    public ReferenceService(IReferenceRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ReferenceResponse>> GetAllGendersAsync()
    {
        var data = await _repository.GetGendersAsync();
        return _mapper.Map<IEnumerable<ReferenceResponse>>(data);
    }

    public async Task<IEnumerable<ReferenceResponse>> GetAllCitizenshipsAsync()
    {
        var data = await _repository.GetCitizenshipsAsync();
        return _mapper.Map<IEnumerable<ReferenceResponse>>(data);
    }

    public async Task<IEnumerable<ReferenceResponse>> GetAllRelationshipsAsync()
    {
        var data = await _repository.GetRelationshipsAsync();
        return _mapper.Map<IEnumerable<ReferenceResponse>>(data);
    }
    
    public async Task<IEnumerable<ReferenceResponse>> GetEnrolmentStatusesAsync()
    {
        var data = await _repository.GetEnrolmentStatusesAsync();
        return _mapper.Map<IEnumerable<ReferenceResponse>>(data);
    }
    // Tambahan baru
    public async Task<IEnumerable<ReferenceResponse>> GetAllClassLevelsAsync() 
    { 
        var data = await _repository.GetClassLevelsAsync(); return _mapper.Map<IEnumerable<ReferenceResponse>>(data); 
    } 
    
    public async Task<IEnumerable<ReferenceResponse>> GetAllReligionsAsync() 
    { 
        var data = await _repository.GetReligionsAsync(); return _mapper.Map<IEnumerable<ReferenceResponse>>(data); 
    } 
    
    public async Task<IEnumerable<ReferenceResponse>> GetAllLanguagesAsync() 
    { 
        var data = await _repository.GetLanguagesAsync(); return _mapper.Map<IEnumerable<ReferenceResponse>>(data); 
    } 
    
    public async Task<IEnumerable<ReferenceResponse>> GetAllFeeTypesAsync() 
    { 
        var data = await _repository.GetFeeTypesAsync(); return _mapper.Map<IEnumerable<ReferenceResponse>>(data); 
    }
}