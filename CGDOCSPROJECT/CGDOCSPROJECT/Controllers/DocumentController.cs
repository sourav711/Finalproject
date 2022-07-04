using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Mime;
using Microsoft.AspNetCore.StaticFiles;
using System.Reflection.Metadata;
using Microsoft.CodeAnalysis;
using CGDOCSPROJECT.Models;
using CGDOCSPROJECT.RequestModel;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly CG_DOCSContext _cgcontext;
        private IHostingEnvironment _environment;
        public DocumentController(CG_DOCSContext project, IHostingEnvironment env)
        {
            _cgcontext = project;
            _environment = env;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var getInfo = _cgcontext.Files.ToList();
            return Ok(getInfo);
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cgcontext.Files.Where(obj => obj.FolderId == id && obj.IsDeleted == false);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        // POST: api/PlayersInfo
        [HttpPost]
        public void Post([FromBody] DocumentRequest value)
        {
            try
            {
                Files obj = new Files();
                obj.DocumentName = value.DocumentName;
                obj.ContentType = value.ContentType;
                obj.Size = value.Size;
                obj.CreatedAt = value.CreatedAt;
                obj.CreatedBy = value.CreatedBy;
                obj.IsDeleted = value.IsDeleted;
                obj.FolderId = value.FolderId;
                obj.FavouriteFiles = false;
                _cgcontext.Files.Add(obj);
                _cgcontext.SaveChanges();
            }
            catch (Exception)
            {

            }

        }
        [HttpPost]
        [Route("upload/{createdAt}/{createdBy}/{folderId}")]
        public async Task<ActionResult> Upload(List<IFormFile> files, DateTime createdAt, int createdBy, int folderId)
        {
            long size = files.Sum(f => f.Length);
            var rootPath = Path.Combine(_environment.ContentRootPath, "Resources", "Documents");
            if (!Directory.Exists(rootPath))
                Directory.CreateDirectory(rootPath);
            foreach (var file in files)
            {
                var filePath = Path.Combine(rootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    var Documents = new Files
                    {
                        DocumentName = file.FileName,
                        ContentType = file.ContentType,
                        Size = file.Length,
                        CreatedAt = createdAt,
                        CreatedBy = createdBy,
                        FolderId = folderId,
                        IsDeleted = false,
                        FavouriteFiles=false


                    };
                    await file.CopyToAsync(stream);

                    _cgcontext.Files.Add(Documents);
                    await _cgcontext.SaveChangesAsync();
                }
            }


            return Ok(new { count = files.Count, size });
        }
        [HttpPost]
        [Route("download/{id}")]
        public async Task<ActionResult> Download(int id)
        {
            try
            {
                var provider = new FileExtensionContentTypeProvider();
                var document = _cgcontext.Files.FirstOrDefault(o => o.DocumentId == id);
                if (document == null)
                    return NotFound();
                var file = Path.Combine(_environment.ContentRootPath, "Resources", "Documents", document.DocumentName);
                string contentType;
                if (!provider.TryGetContentType(file, out contentType))
                {
                    contentType = "application/octet-stream";
                }

                byte[] fileBytes;
                if (System.IO.File.Exists(file))
                {
                    fileBytes = System.IO.File.ReadAllBytes(file);
                }
                else
                {
                    return NotFound();
                }
                return File(fileBytes, contentType, document.DocumentName);
            }
            catch (Exception e)
            {

            }
            return null;
        }


        [HttpGet("{value}")]
        public IActionResult Get(string value)
        {

            var result = _cgcontext.Files.Where(obj => obj.DocumentName.Contains(value));
            return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cgcontext.Files.First(obj => obj.DocumentId == id);
                newobj.IsDeleted = true;
                _cgcontext.Files.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var matches = _cgcontext.Files.Where(res => res.DocumentId == id).ToList();
            matches.ForEach(res => _cgcontext.Files.Remove(res));
            _cgcontext.SaveChanges();

        }
        [HttpGet("{value},{id:int},{userid:int}")]
        public IActionResult Get(string value, int id, int userid)
        {

            var result = _cgcontext.Files.Where(e => e.CreatedBy == userid).Where(o => o.FolderId == id).Where(obj => obj.DocumentName.Contains(value) && obj.IsDeleted == false);
            return Ok(result);
        }


        [HttpPut("Undelete/{id}")]
        public IActionResult RemoveDelete(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cgcontext.Files.First(obj => obj.DocumentId == id);
                newobj.IsDeleted = false;
                _cgcontext.Files.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }
        [HttpGet("favourite/{id}")]
        public IActionResult ShowFavourite(int id)
        {
            try
            {
                var result = _cgcontext.Files.Where(o => o.FavouriteFiles == true && o.FolderId == id && o.IsDeleted == false);
                return Ok(result);
            }
            catch (Exception e)
            {
                return null;
            }

        }
        [HttpGet("Trash/{id}")]
        public IActionResult ShowTrash(int id)
        {
            try
            {
                var result = _cgcontext.Files.Where(o => o.IsDeleted == true && o.FolderId == id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return null;
            }

        }

        [HttpPut("favourite/{id}")]
        public IActionResult PutFavourite(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cgcontext.Files.First(obj => obj.DocumentId == id);
                newobj.FavouriteFiles = true;
                _cgcontext.Files.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }
        [HttpPut("Removefav/{id}")]
        public IActionResult RemoveFavourite(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cgcontext.Files.First(obj => obj.DocumentId == id);
                newobj.FavouriteFiles = false;
                _cgcontext.Files.Update(newobj);
                _cgcontext.SaveChanges();
                m = 200;
            }
            catch (Exception e)
            {
                m = 404;
            }
            return StatusCode(m);
        }
        [HttpGet("Recent/{userId}/{folderId}/{time}")]
        public IActionResult showRecent(int userId,int folderId,int time)
        {
            int m = 0;
            try
            {
                
                if(time == 1)
                {
                    var createdAt = DateTime.Now.AddMinutes(-60);

                   var res = _cgcontext.Files.Where(o => o.CreatedAt >= createdAt&&o.CreatedBy==userId&&o.FolderId==folderId);
                    return Ok(res);
                }else if(time==30)
                {
                    var createdAt = DateTime.Now.AddMinutes(-30);

                    var res = _cgcontext.Files.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.FolderId == folderId);
                    return Ok(res);
                }
                else
                {
                    var createdAt = DateTime.Now.AddMinutes(-15);

                    var res = _cgcontext.Files.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.FolderId == folderId);
                    return Ok(res);
                }
              
            }catch(Exception e)
            {
                m = 404;
                return StatusCode(m);          }
           
        }

    }
}
