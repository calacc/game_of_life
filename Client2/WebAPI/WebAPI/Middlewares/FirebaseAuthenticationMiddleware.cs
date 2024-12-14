

using System.Text.Json;

namespace WebAPI.Middlewares;

using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

public class FirebaseAuthenticationMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            var token = authHeader.Substring("Bearer ".Length).Trim();
            try
            {
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
                string jsonString = decodedToken.Claims["firebase"].ToString();
                Dictionary<string, object> dictionary = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonString);
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, decodedToken.Uid),
                    new Claim(ClaimTypes.Email, decodedToken.Claims["email"].ToString()),
                    new Claim("provider", dictionary["sign_in_provider"].ToString())
                };
                var identity = new ClaimsIdentity(claims, "firebase");
                var principal = new ClaimsPrincipal(identity);
                // We assign it a proper Identity(not empty) -> it will be considered as Authenticated
                // If we leave it as it is OR assign it an empty Principal/Identity -> it will not be considered as Authenticated
                context.User = principal;
            }
            catch (FirebaseAuthException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        await next(context);
    }
}
