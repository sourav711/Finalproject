using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CGDOCSPROJECT.Models;
using CGDOCSPROJECT.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CG_DOCSContext _cgcontext;



        public UserController(CG_DOCSContext project)
        {
            _cgcontext = project;
        }


        // GET: api/PlayersInfo
        [HttpGet]
        
        public IEnumerable<Users> Get()
        {
            var getInfo = _cgcontext.Users.ToList();
            return getInfo;
        }



        //[HttpGet("{id:int}")]
        //public IActionResult Get(int id)
        //{
        //    try
        //    {
        //        var result = _cgcontext.Users.First(obj => obj.UserId == id);

        //        if (result == null) return NotFound();

        //        return Ok(result);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError,
        //            "Error retrieving data from the database");
        //    }
        //}

        [HttpPost]
        public void Post([FromBody] UserRequest value)
        {
            Users obj = new Users();
            obj.Username = value.Username;
            obj.Password = value.Password;
            obj.CreatedAt = value.CreatedAt;
            obj.Email = value.Email;

            _cgcontext.Users.Add(obj);
            _cgcontext.SaveChanges();


        }
    }
}
