namespace WebAPI.DTO.User;

public class UserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public string Provider { get; set; }
}