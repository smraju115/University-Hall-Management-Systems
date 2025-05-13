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
    public class SeatWithRoomsController : ControllerBase
    {
        private readonly HallDbContext _context;

        public SeatWithRoomsController(HallDbContext context)
        {
            _context = context;
        }

        // GET: api/SeatWithRooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SeatWithRoom>>> GetSeatWithRooms()
        {
            return await _context.SeatWithRooms.Where(x => x.IsActive == true).Include(op=>op.StudentRooms).ToListAsync();
        }

        // GET: api/SeatWithRooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SeatWithRoom>> GetSeatWithRoom(int id)
        {
            var seatWithRoom = await _context.SeatWithRooms.Include(op=>op.StudentRooms).SingleAsync(op=>op.SeatWithRoomId==id);

            if (seatWithRoom == null)
            {
                return NotFound();
            }

            return seatWithRoom;
        }

        // PUT: api/SeatWithRooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeatWithRoom(int id, SeatWithRoom seatWithRoom)
        {
            if (id != seatWithRoom.SeatWithRoomId)
            {
                return BadRequest();
            }

            _context.Entry(seatWithRoom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatWithRoomExists(id))
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

        // POST: api/SeatWithRooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SeatWithRoom>> PostSeatWithRoom(SeatWithRoom seatWithRoom)
        {
            _context.SeatWithRooms.Add(seatWithRoom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeatWithRoom", new { id = seatWithRoom.SeatWithRoomId }, seatWithRoom);
        }

        // DELETE: api/SeatWithRooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeatWithRoom(int id)
        {
            var seatWithRoom = await _context.SeatWithRooms.FindAsync(id);
            if (seatWithRoom == null)
            {
                return NotFound();
            }

            seatWithRoom.IsActive = false;
            //_context.SeatWithRooms.Remove(seatWithRoom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeatWithRoomExists(int id)
        {
            return _context.SeatWithRooms.Any(e => e.SeatWithRoomId == id && e.IsActive == true);
        }
    }
}
