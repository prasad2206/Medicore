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
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public AppointmentsController(ApplicationDbContext db) => _db = db;

        // GET: api/appointments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _db.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.Patient)
                .ToListAsync();

            var result = appointments.Select(a => new
            {
                a.Id,
                Doctor = a.Doctor.Name,
                Patient = a.Patient.Name,
                DateTime = a.DateTime
            });

            return Ok(result);
        }

        // POST: api/appointments
        [HttpPost]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Create([FromBody] Appointment appointment)
        {
            // Validation: ensure doctor & patient exist
            var doctor = await _db.Doctors.FindAsync(appointment.DoctorId);
            var patient = await _db.Patients.FindAsync(appointment.PatientId);
            if (doctor == null || patient == null)
                return BadRequest(new { message = "Invalid doctor or patient ID." });

            // Check if doctor already has appointment same time
            bool conflict = await _db.Appointments
                .AnyAsync(a => a.DoctorId == appointment.DoctorId && a.DateTime == appointment.DateTime);
            if (conflict)
                return BadRequest(new { message = "Doctor not available at selected time." });

            _db.Appointments.Add(appointment);
            await _db.SaveChangesAsync();
            return Ok(appointment);
        }

        // DELETE: api/appointments/1
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _db.Appointments.FindAsync(id);
            if (existing == null) return NotFound();

            _db.Appointments.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
