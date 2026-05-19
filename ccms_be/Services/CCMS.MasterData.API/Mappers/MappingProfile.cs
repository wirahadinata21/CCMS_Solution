using AutoMapper;
using CCMS.MasterData.API.Entities;
using CCMS.MasterData.API.DTOs;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CCMS.MasterData.API.Mappers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Map dari Entity ke DTO
        CreateMap<Gender, ReferenceResponse>();
        CreateMap<Citizenship, ReferenceResponse>();
        CreateMap<Relationship, ReferenceResponse>();
        CreateMap<EnrolmentStatus, ReferenceResponse>();
    }
}