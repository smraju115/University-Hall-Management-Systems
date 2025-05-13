﻿using System;
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
    
    public class HallsController : ControllerBase
    {
        private readonly HallDbContext _context;

        public HallsController(HallDbContext context)
        {
            _context = context;
        }

        // GET: api/Halls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hall>>> GetHalls()
        {
            return await _context.Halls.Where(x => x.IsActive == true).Include(op=>op.HallBlocks).ToListAsync();
        }  

        // GET: api/Halls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hall>> GetHall(int id)
        {
            var hall = await _context.Halls.Include(op=>op.HallBlocks).SingleAsync(op=>op.HallId==id);

            if (hall == null)
            {
                return NotFound();
            }

            return hall;
        }
       

        // PUT: api/Halls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHall(int id, Hall hall)
        {
            if (id != hall.HallId)
            {
                return BadRequest();
            }

            _context.Entry(hall).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallExists(id))
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

        // POST: api/Halls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Hall>> PostHall(Hall hall)
        {
            _context.Halls.Add(hall);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHall", new { id = hall.HallId }, hall);
        }

        // DELETE: api/Halls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHall(int id)
        {
            var hall = await _context.Halls.FindAsync(id);
            if (hall == null)
            {
                return NotFound();
            }

            hall.IsActive = false;
            //_context.Halls.Remove(hall);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HallExists(int id)
        {
            return _context.Halls.Any(e => e.HallId == id && e.IsActive == true);
        }

        //AllHallsCount
        [HttpGet("total-halls")]
        public IActionResult GetTotalHalls()
        {
            var totalHalls = _context.Halls.Where(x => x.IsActive == true).Count();
            return Ok(new { totalHalls });
        }
    }
}
