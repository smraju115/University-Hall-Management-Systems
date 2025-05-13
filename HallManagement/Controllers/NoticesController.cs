using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HallManagement.Shared.Models;
using HallManagement.ViewModels;
using Microsoft.Extensions.Hosting;

namespace HallManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticesController : ControllerBase
    {
        private readonly HallDbContext _context;
        private readonly IWebHostEnvironment _environment;


        public NoticesController(HallDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Notices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notice>>> GetNotices()
        {
            return await _context.Notices.Where(x=> x.IsActive == true).ToListAsync();
        }

        // GET: api/Notices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notice>> GetNotice(int id)
        {
            var notice = await _context.Notices.FindAsync(id);

            if (notice == null)
            {
                return NotFound();
            }

            return notice;
        }

        // PUT: api/Notices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotice(int id, Notice notice)
        {
            if (id != notice.NoticeId)
            {
                return BadRequest();
            }

            _context.Entry(notice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoticeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Notices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Notice>> PostNotice(Notice notice)
        {
            _context.Notices.Add(notice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotice", new { id = notice.NoticeId }, notice);
        }



        //UploadNoticeFile
        [HttpPost("UploadNotice")]
        public async Task<ActionResult<List<UploadNoticeResponse>>> UploadNoticeFiles(IEnumerable<IFormFile> notices)
        {
            if (notices == null || !notices.Any())
            {
                return BadRequest("No files uploaded.");
            }

            var uploadNoticeResponses = new List<UploadNoticeResponse>();

            foreach (var notice in notices)
            {
                //Validate file type
                string ext = Path.GetExtension(notice.FileName).ToLower();
                if (ext != ".pdf")
                {
                    return BadRequest($"Invalid file type. Only PDF files are allowed. File: {notice.FileName}");
                }

                // Save file with original name
                string savePath = Path.Combine(_environment.WebRootPath, "NoticeFiles", notice.FileName);
                try
                {
                    using (var fs = new FileStream(savePath, FileMode.Create))
                    {
                        await notice.CopyToAsync(fs);
                    }
                    uploadNoticeResponses.Add(new UploadNoticeResponse { NewFileName = notice.FileName });
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"File upload failed: {ex.Message}");
                }
            }

            return Ok(uploadNoticeResponses);
        }


        // DELETE: api/Notices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotice(int id)
        {
            var notice = await _context.Notices.FindAsync(id);
            if (notice == null)
            {
                return NotFound();
            }
            notice.IsActive = false;            
            //_context.Notices.Remove(notice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //AllNoticesCount
        [HttpGet("total-notices")]
        public IActionResult GetTotalNotices()
        {
            var totalNotices = _context.Notices.Where(x => x.IsActive == true).Count();
            return Ok(new { totalNotices });
        }

        private bool NoticeExists(int id)
        {
            //var notichList = _context.Notices.ToList();
            //foreach (var item in notichList)
            //{
            //    if (item.NoticeId == id && item.IsActive)
            //    {
            //        return true;
            //    }
            //}
            //return false;

            return _context.Notices.Any(e => e.NoticeId == id && e.IsActive == true );
           // return _context.Notices.Any(e => e.NoticeId == id && e.IsActive);
        }
    }
}
