using System;
using System.Collections.Generic;

namespace CGDOCSPROJECT.Models
{
    public partial class Users
    {
        public Users()
        {
            Files = new HashSet<Files>();
            Folder = new HashSet<Folder>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public long? Mobile { get; set; }

        public ICollection<Files> Files { get; set; }
        public ICollection<Folder> Folder { get; set; }
    }
}
