namespace WebAPI.Application.Exceptions;

public class NotFoundException(string name) : Exception($"{name} not found.")
{
}