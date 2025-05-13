using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HallManagement.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HallManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentRoomsController : ControllerBase
    {
        private readonly HallDbContext _context;

        public StudentRoomsController(HallDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentRooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentRoom>>> GetStudentRooms()
        {
            return await _context.StudentRooms.Where(x => x.IsActive == true).Include(op=>op.Student).Include(op=>op.SeatWithRoom).ToListAsync();
        }

        // GET: api/StudentRooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentRoom>> GetStudentRoom(int id)
        {
            var studentRoom = await _context.StudentRooms.Include(op => op.Student).Include(op => op.SeatWithRoom).SingleAsync(op => op.StudentRoomId == id);

            if (studentRoom == null)
            {
                return NotFound();
            }

            return studentRoom;
        }

        // PUT: api/StudentRooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentRoom(int id, StudentRoom studentRoom)
        {
            if (id != studentRoom.StudentRoomId)
            {
                return BadRequest();
            }

            _context.Entry(studentRoom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentRoomExists(id))
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

        // POST: api/StudentRooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentRoom>> PostStudentRoom(StudentRoom studentRoom)
        {
            _context.StudentRooms.Add(studentRoom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentRoom", new { id = studentRoom.StudentRoomId }, studentRoom);
        }

        // DELETE: api/StudentRooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentRoom(int id)
        {
            var studentRoom = await _context.StudentRooms.FindAsync(id);
            if (studentRoom == null)
            {
                return NotFound();
            }

            studentRoom.IsActive = false;
            //_context.StudentRooms.Remove(studentRoom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentRoomExists(int id)
        {
            return _context.StudentRooms.Any(e => e.StudentRoomId == id && e.IsActive == true);
        }
    }
}
