using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediCore.Api.Data;
using MediCore.Api.Models;

namespace MediCore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public PatientsController(ApplicationDbContext db) => _db = db;

        // GET: api/patients
        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _db.Patients.ToListAsync());

        // GET: api/patients/1
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var patient = await _db.Patients.FindAsync(id);
            if (patient == null) return NotFound();
            return Ok(patient);
        }

        // POST: api/patients
        [HttpPost]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Create([FromBody] Patient patient)
        {
            _db.Patients.Add(patient);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = patient.Id }, patient);
        }

        // PUT: api/patients/1
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Update(int id, [FromBody] Patient patient)
        {
            var existing = await _db.Patients.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = patient.Name;
            existing.Age = patient.Age;
            existing.Gender = patient.Gender;
            existing.Phone = patient.Phone;
            existing.Address = patient.Address;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/patients/1
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _db.Patients.FindAsync(id);
            if (existing == null) return NotFound();

            _db.Patients.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
