namespace WebAPI.Domain.Entities;

public class User
{
    public string Id { get; set; }
    public string Email { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public string Provider { get; set; }
}