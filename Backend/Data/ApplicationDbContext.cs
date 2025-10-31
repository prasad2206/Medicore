using Microsoft.EntityFrameworkCore;
using MediCore.Api.Models;

namespace MediCore.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<Doctor> Doctors => Set<Doctor>();
        public DbSet<Patient> Patients => Set<Patient>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<Billing> Billings => Set<Billing>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // seed roles + sample admin user (password hashed)
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "Doctor" },
                new Role { Id = 3, Name = "Receptionist" }
            );

            // We'll create admin user seed after hashing password in code during migration or use a known hashed value:
            var adminPasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123");
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Admin User", Email = "admin@medi.com", PasswordHash = "$2a$11$I2ohGwMjqvKviL3QUfMIpumKctHVLPgOP5DhVLXESYOSbAttlSHy6", RoleId = 1 }
            );

            // (Optional) seed sample doctors/patients similar to frontend mock
            modelBuilder.Entity<Doctor>().HasData(
                new Doctor { Id = 1, Name = "Dr. John Smith", Specialization = "Cardiology", Phone = "9876543210", Email = "john@medi.com" },
                new Doctor { Id = 2, Name = "Dr. Priya Sharma", Specialization = "Neurology", Phone = "9988776655", Email = "priya@medi.com" }
            );

            modelBuilder.Entity<Patient>().HasData(
                new Patient { Id = 1, Name = "Amit Verma", Age = 32, Gender = "Male", Phone = "9876543211", Address = "Delhi" },
                new Patient { Id = 2, Name = "Sneha Gupta", Age = 26, Gender = "Female", Phone = "9999988888", Address = "Mumbai" }
            );
        }
    }
}
