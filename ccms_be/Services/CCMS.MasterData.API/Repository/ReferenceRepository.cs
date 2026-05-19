using CCMS.MasterData.API.Data;
using CCMS.MasterData.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CCMS.MasterData.API.Repository;

public class ReferenceRepository : IReferenceRepository
{
    private readonly MasterDataContext _context;

    public ReferenceRepository(MasterDataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Gender>> GetGendersAsync()
        => await _context.Genders.ToListAsync();

    public async Task<IEnumerable<Citizenship>> GetCitizenshipsAsync()
        => await _context.Citizenships.ToListAsync();

    // Implementasi untuk Relationship
    public async Task<IEnumerable<Relationship>> GetRelationshipsAsync()
        => await _context.Relationships.ToListAsync();
    
    public async Task<IEnumerable<EnrolmentStatus>> GetEnrolmentStatusesAsync()
        => await _context.EnrolmentStatuses.ToListAsync();
    // Tambahan baru
    public async Task<IEnumerable<ClassLevel>> GetClassLevelsAsync() 
        => await _context.ClassLevels.ToListAsync(); 
    
    public async Task<IEnumerable<Religion>> GetReligionsAsync() 
        => await _context.Religions.ToListAsync(); 
    
    public async Task<IEnumerable<Language>> GetLanguagesAsync() 
        => await _context.Languages.ToListAsync(); 
    
    public async Task<IEnumerable<FeeType>> GetFeeTypesAsync() 
        => await _context.FeeTypes.ToListAsync();
}