using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.Exceptions;
using WebAPI.Filters;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class TestController : ControllerBase
{
    [HttpGet]
    [FirebaseAuthorizationFilter]
    public async Task<ActionResult> GetProtected()
    {
        return Ok();
    }
    
    [HttpGet]
    public async Task<ActionResult> GetUnprotected()
    {
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> CheckExceptionFilters(TestModel dto)
    {
        // throw new InvalidUserException("Test, Invalid user");
        // throw new InvalidClaimsException("Test, Invalid claims");
        throw new NotFoundException("Test");
        return Ok();
    }
}

public class TestModel
{
    public string Name { get; set; }
    public bool Test { get; set; }
}