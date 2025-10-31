using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using MediCore.Api.Data;
using MediCore.Api.Models;

namespace MediCore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // only authenticated users
    public class DoctorsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public DoctorsController(ApplicationDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _db.Doctors.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var doctor = await _db.Doctors.FindAsync(id);
            if (doctor == null)
                return NotFound();
            return Ok(doctor);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] Doctor doctor)
        {
            _db.Doctors.Add(doctor);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = doctor.Id }, doctor);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] Doctor doctor)
        {
            var existing = await _db.Doctors.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Name = doctor.Name;
            existing.Specialization = doctor.Specialization;
            existing.Phone = doctor.Phone;
            existing.Email = doctor.Email;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _db.Doctors.FindAsync(id);
            if (existing == null) return NotFound();
            _db.Doctors.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
