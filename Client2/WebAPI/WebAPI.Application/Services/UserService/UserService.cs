using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.Exceptions;
using WebAPI.Domain.Entities;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.UserService;

public class UserService(AppDbContext context) : IUserService
{
    public async Task<User> CreateAsync(User user)
    {
        var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        if (existingUser == null)
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }
        return existingUser;
    }

    public async Task<User> GetByIdAsync(string id)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            throw new NotFoundException("User");
        }
        return user;
    }

    public User GetFromClaims(ClaimsPrincipal claimIdentity)
    {
        var firebaseUidClaim = claimIdentity.FindFirst(ClaimTypes.NameIdentifier);
        var emailClaim = claimIdentity.FindFirst(ClaimTypes.Email);
        var providerClaim = claimIdentity.FindFirst("provider");
        if (firebaseUidClaim == null || emailClaim == null || providerClaim == null)
        {
            // Most likely not Authenticated
            throw new InvalidClaimsException("[UserService.GetFromClaims] Claims are Null");
        }
        return new User()
        {
            Id = firebaseUidClaim.Value,
            Email = emailClaim.Value,
            Provider = providerClaim.Value
        };
    }
}