using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediCore.Api.Data;
using MediCore.Api.DTOs;
using MediCore.Api.Models;
using MediCore.Api.Services;

namespace MediCore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ITokenService _tokenService;

        public AuthController(ApplicationDbContext db, ITokenService tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == req.Email);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials" });

            var token = _tokenService.CreateToken(user, user.Role.Name);
            return Ok(new LoginResponse(token, user.Name, user.Email, user.Role.Name));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            if (await _db.Users.AnyAsync(u => u.Email == req.Email))
                return BadRequest(new { message = "Email already exists" });

            var role = await _db.Roles.FirstOrDefaultAsync(r => r.Name == req.Role) ??
                       await _db.Roles.FirstOrDefaultAsync(r => r.Name == "Receptionist"); // default

            var user = new User
            {
                Name = req.Name,
                Email = req.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                RoleId = role!.Id
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var createdUser = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == user.Id);
            var token = _tokenService.CreateToken(createdUser!, createdUser!.Role.Name);

            return Ok(new LoginResponse(token, createdUser.Name, createdUser.Email, createdUser.Role.Name));
        }
    }
}
