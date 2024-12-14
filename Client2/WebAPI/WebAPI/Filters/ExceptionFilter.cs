using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Application.Exceptions;

namespace WebAPI.Filters;

public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        Exception e = context.Exception;
        if (e is NotFoundException)
        {
            context.Result = new NotFoundObjectResult(new {e.Message});
        }
        else if ( e is InvalidUserException)
        {
            context.Result = new UnauthorizedObjectResult(new {e.Message});
        }
        else if (e is InvalidClaimsException)
        {
            context.Result = new UnauthorizedObjectResult(new {e.Message});;
        }
        else
        {
            context.Result = new BadRequestObjectResult(new {e.Message});
        }
    }
}