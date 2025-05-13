using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HallManagement.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HallManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class HallBlocksController : ControllerBase
    {
        private readonly HallDbContext _context;

        public HallBlocksController(HallDbContext context)
        {
            _context = context;
        }

        // GET: api/HallBlocks
        [HttpGet]
        //[AllowAnonymous]
        public async Task<ActionResult<IEnumerable<HallBlock>>> GetHallBlocks()
        {
            return await _context.HallBlocks.Where(x => x.IsActive == true).Include(op=>op.HallFloors).ToListAsync();
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<HallBlock>> GetHallBlock(int id)
        {
            var hallBlock = await _context.HallBlocks.Include(op => op.HallFloors).SingleAsync(op => op.HallBlockId == id);

            if (hallBlock == null)
            {
                return NotFound();
            }

            return hallBlock;
        }

        // PUT: api/HallBlocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHallBlock(int id, HallBlock hallBlock)
        {
            if (id != hallBlock.HallBlockId)
            {
                return BadRequest();
            }

            _context.Entry(hallBlock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallBlockExists(id))
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

        // POST: api/HallBlocks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HallBlock>> PostHallBlock(HallBlock hallBlock)
        {
            _context.HallBlocks.Add(hallBlock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHallBlock", new { id = hallBlock.HallBlockId }, hallBlock);
        }

        // DELETE: api/HallBlocks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHallBlock(int id)
        {
            var hallBlock = await _context.HallBlocks.FindAsync(id);
            if (hallBlock == null)
            {
                return NotFound();
            }

            hallBlock.IsActive = false;
            //_context.HallBlocks.Remove(hallBlock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HallBlockExists(int id)
        {
            return _context.HallBlocks.Any(e => e.HallBlockId == id && e.IsActive == true);
        }

        //AllHallBlocksCount
        [HttpGet("total-hallblocks")]
        public IActionResult GetTotalHallBlocks()
        {
            var totalHallBlocks = _context.HallBlocks.Where(x => x.IsActive == true).Count();
            return Ok(new { totalHallBlocks });
        }
    }
}
