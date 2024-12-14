using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.Exceptions;
using WebAPI.Application.Services.UserService;
using WebAPI.Domain.Entities;
using WebAPI.DTO.User;
using WebAPI.Filters;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class UserController(IUserService userService, IMapper mapper) : ControllerBase
{
    // ByToken -> gets necessary data from decoded firebase access token claims
    [HttpPost]
    [FirebaseAuthorizationFilter]
    public async Task<ActionResult<UserDto>> CreateByTokenAsync()
    {
        var claimsUser = userService.GetFromClaims(User);
        var savedUser = await userService.CreateAsync(claimsUser);
        var userDto = mapper.Map<UserDto>(savedUser);
        return Ok(userDto);
    }

    // ByToken -> gets necessary data from decoded firebase access token claims
    [HttpGet]
    [FirebaseAuthorizationFilter]
    public async Task<ActionResult> GetByTokenAsync()
    {
        var claimsUser = userService.GetFromClaims(User);
        User user;
        try
        {
            user = await userService.GetByIdAsync(claimsUser.Id);
        }
        catch (NotFoundException e)
        {
            user = await userService.CreateAsync(claimsUser);
        }
        var userDto = mapper.Map<UserDto>(user);
        return Ok(userDto);
    }
}