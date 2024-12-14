using AutoMapper;
using WebAPI.Domain.Entities;
using WebAPI.DTO.User;

namespace WebAPI.Automapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<User, UsertDetailDto>();
    }
}