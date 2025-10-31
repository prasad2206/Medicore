﻿namespace MediCore.Api.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!; // e.g. "Admin","Doctor","Receptionist"
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
