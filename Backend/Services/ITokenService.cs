using MediCore.Api.Models;

namespace MediCore.Api.Services
{
    public interface ITokenService
    {
        string CreateToken(User user, string roleName);
    }
}
