using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CGDOCSPROJECT.Models;
using CGDOCSPROJECT.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CGDOCSPROJECT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly CG_DOCSContext _cgcontext;
        public FolderController(CG_DOCSContext cg)
        {
            _cgcontext = cg;
        }
        //Show details of particular folder
        [HttpGet("details/{id:int}")]
        public IActionResult ShowDetails(int id)
        {
            try
            {
                var result = _cgcontext.Folder.First(obj => obj.FolderId == id);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        //Show folders by user id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cgcontext.Folder.Where(obj => obj.CreatedBy == id && obj.IsDeleted == false);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        //show favourites
        [HttpGet("favourite/{id}")]
        public IActionResult ShowFavourite(int id)
        {
            try
            {
                var result = _cgcontext.Folder.Where(o => o.IsFavourite == true&&o.CreatedBy==id&&o.IsDeleted==false);
                return Ok(result);
            }catch(Exception e)
            {
                return null;
            }

        }
        //show trash
        [HttpGet("Trash/{id}")]
        public IActionResult ShowTrash(int id)
        {
            try
            {
                var result = _cgcontext.Folder.Where(o => o.IsDeleted == true && o.CreatedBy == id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return null;
            }

        }

        //add folder to favourites
        [HttpPut("favourite/{id}")]
        public IActionResult PutFavourite(int id)
        {
            int m = 0;
            try
            {

                var res = _cgcontext.Files.Where(o => o.FolderId == id).ToList();
                foreach(var objj in res)
                {
                    objj.FavouriteFiles = true;
                    _cgcontext.Files.Update(objj);
                    _cgcontext.SaveChanges();

                }
                var newobj = _cgcontext.Folder.First(obj => obj.FolderId == id);
                newobj.IsFavourite = true;
                _cgcontext.Folder.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //remove from favourites
        [HttpPut("Removefav/{id}")]
        public IActionResult RemoveFavourite(int id)
        {
            int m = 0;
            try
            {
                var res = _cgcontext.Files.Where(o => o.FolderId == id).ToList();
                foreach (var objj in res)
                {
                    objj.FavouriteFiles = false;
                    _cgcontext.Files.Update(objj);
                    _cgcontext.SaveChanges();

                }
                var newobj = _cgcontext.Folder.First(obj => obj.FolderId == id);
                newobj.IsFavourite =false;
                _cgcontext.Folder.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //adding a new folder
        [HttpPost]
        public void Post([FromBody] FolderRequest value)
        {
            Folder obj = new Folder();
            obj.FolderName = value.FolderName;
            obj.CreatedAt = value.CreatedAt;
            obj.CreatedBy = value.CreatedBy;
            obj.IsDeleted = false;
            obj.IsFavourite = false;
            _cgcontext.Folder.Add(obj);
            _cgcontext.SaveChanges();
        }


        //soft deleting a folder
        [HttpPut("SoftDeleted/{id}")]
        public IActionResult Put(int id)
        {
            int m = 0;
            try
            {
                var res = _cgcontext.Files.Where(o => o.FolderId == id).ToList();
                foreach (var objj in res)
                {
                    objj.IsDeleted= true;
                    _cgcontext.Files.Update(objj);
                    _cgcontext.SaveChanges();

                }
                var newobj = _cgcontext.Folder.First(obj => obj.FolderId == id);
                newobj.IsDeleted = true;
                _cgcontext.Folder.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //undeleting a folder
        [HttpPut("Undelete/{id}")]
        public IActionResult RemoveDelete(int id)
        {
            int m = 0;
            try
            {
                var res = _cgcontext.Files.Where(o => o.FolderId == id).ToList();
                foreach (var objj in res)
                {
                    objj.IsDeleted = false;
                    _cgcontext.Files.Update(objj);
                    _cgcontext.SaveChanges();

                }
                var newobj = _cgcontext.Folder.First(obj => obj.FolderId == id);
                newobj.IsDeleted = false;
                _cgcontext.Folder.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }
        //searching a folder
        [HttpGet("{id:int}/{value}")]
        public IActionResult SearchResult(int id, string value)
        {

            var result = _cgcontext.Folder.Where(o => o.CreatedBy == id).Where(obj => obj.FolderName.Contains(value));
            return Ok(result);
        }

        //delete a folder permanent
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var document = _cgcontext.Files.Where(res => res.FolderId == id).ToList();
            document.ForEach(res => _cgcontext.Files.Remove(res));
            _cgcontext.SaveChanges();
            var folderdel = _cgcontext.Folder.Where(res => res.FolderId == id).ToList();
            folderdel.ForEach(res => _cgcontext.Folder.Remove(res));
            _cgcontext.SaveChanges();

        }
        [HttpGet("Recent/{userId}/{time}")]
        public IActionResult showRecent(int userId,int time)
        {
            int m = 0;
            try
            {

                if (time == 1)
                {
                    var createdAt = DateTime.Now.AddMinutes(-60);

                    var res = _cgcontext.Folder.Where(o => o.CreatedAt >= createdAt&& o.CreatedBy==userId);
                    return Ok(res);
                }
                else if (time == 30)
                {
                    var createdAt = DateTime.Now.AddMinutes(-30);

                    var res = _cgcontext.Folder.Where(o => o.CreatedAt >= createdAt&&o.CreatedBy==userId);
                    return Ok(res);
                }
                else
                {
                    var createdAt = DateTime.Now.AddMinutes(-15);

                    var res = _cgcontext.Folder.Where(o => o.CreatedAt >= createdAt&&o.CreatedBy==userId);
                    return Ok(res);
                }

            }
            catch (Exception e)
            {
                m = 404;
                return StatusCode(m);
            }

        }
    }
}
