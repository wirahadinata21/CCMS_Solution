using CCMS.MasterData.API.Entities;

namespace CCMS.MasterData.API.Repository;

public interface IReferenceRepository
{
    Task<IEnumerable<Gender>> GetGendersAsync();
    Task<IEnumerable<Citizenship>> GetCitizenshipsAsync();
    // Tambahkan baris di bawah ini agar error CS1061 hilang
    Task<IEnumerable<Relationship>> GetRelationshipsAsync();
    Task<IEnumerable<EnrolmentStatus>> GetEnrolmentStatusesAsync(); 
    // Tambahan baru
    Task<IEnumerable<ClassLevel>> GetClassLevelsAsync(); 
    Task<IEnumerable<Religion>> GetReligionsAsync(); 
    Task<IEnumerable<Language>> GetLanguagesAsync(); 
    Task<IEnumerable<FeeType>> GetFeeTypesAsync();
}