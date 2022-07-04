using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CGDOCSPROJECT.RequestModel
{
    public class UserRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public long? Mobile { get; set; }
    }
}
