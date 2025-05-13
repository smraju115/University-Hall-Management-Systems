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
    public class HallFloorsController : ControllerBase
    {
        private readonly HallDbContext _context;

        public HallFloorsController(HallDbContext context)
        {
            _context = context;
        }

        // GET: api/HallFloors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HallFloor>>> GetHallFloors()
        {
            return await _context.HallFloors.Where(x => x.IsActive == true).Include(op=>op.Rooms).ToListAsync();
        }

        // GET: api/HallFloors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HallFloor>> GetHallFloor(int id)
        {
            var hallFloor = await _context.HallFloors.Include(op => op.Rooms).SingleAsync(op=>op.HallFloorId==id);

            if (hallFloor == null)
            {
                return NotFound();
            }

            return hallFloor;
        }

        // PUT: api/HallFloors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHallFloor(int id, HallFloor hallFloor)
        {
            if (id != hallFloor.HallFloorId)
            {
                return BadRequest();
            }

            _context.Entry(hallFloor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallFloorExists(id))
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

        // POST: api/HallFloors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HallFloor>> PostHallFloor(HallFloor hallFloor)
        {
            _context.HallFloors.Add(hallFloor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHallFloor", new { id = hallFloor.HallFloorId }, hallFloor);
        }

        // DELETE: api/HallFloors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHallFloor(int id)
        {
            var hallFloor = await _context.HallFloors.FindAsync(id);
            if (hallFloor == null)
            {
                return NotFound();
            }

            hallFloor.IsActive = false;
            //_context.HallFloors.Remove(hallFloor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HallFloorExists(int id)
        {
            return _context.HallFloors.Any(e => e.HallFloorId == id && e.IsActive == true);
        }

        //AllHallFloorsCount
        [HttpGet("total-hallfloors")]
        public IActionResult GetTotalHallFloors()
        {
            var totalHallFloors = _context.HallFloors.Where(x=>x.IsActive == true).Count();
            return Ok(new { totalHallFloors });
        }
    }
}
