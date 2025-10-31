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
    public class BillingController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public BillingController(ApplicationDbContext db) => _db = db;

        // GET: api/billing
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bills = await _db.Billings.Include(b => b.Patient).ToListAsync();
            var result = bills.Select(b => new
            {
                b.Id,
                Patient = b.Patient.Name,
                b.Amount,
                b.Date
            });
            return Ok(result);
        }

        // POST: api/billing
        [HttpPost]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Create([FromBody] Billing bill)
        {
            var patient = await _db.Patients.FindAsync(bill.PatientId);
            if (patient == null) return BadRequest(new { message = "Invalid patient ID." });

            bill.Date = DateTime.Now;
            _db.Billings.Add(bill);
            await _db.SaveChangesAsync();
            return Ok(bill);
        }

        // DELETE: api/billing/1
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<IActionResult> Delete(int id)
        {
            var bill = await _db.Billings.FindAsync(id);
            if (bill == null) return NotFound();

            _db.Billings.Remove(bill);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
