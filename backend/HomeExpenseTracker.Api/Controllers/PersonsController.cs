using Microsoft.AspNetCore.Mvc;
using HomeExpenseTracker.Api.Dtos;
using HomeExpenseTracker.Api.Services;

namespace HomeExpenseTracker.Api.Controllers
{
    [ApiController]
    [Route("api/persons")]
    public class PersonsController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonsController(IPersonService personService)
        {
            _personService = personService;
        }

        /// <summary>Lists all registered people.</summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonDto>>> GetAll()
        {
            return Ok(await _personService.GetAllAsync());
        }

        /// <summary>Creates a new person.</summary>
        [HttpPost]
        public async Task<ActionResult<PersonDto>> Create(CreatePersonDto dto)
        {
            var created = await _personService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
        }

        /// <summary>Deletes a person and their transactions (cascade delete).</summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _personService.DeleteAsync(id);
            if (!deleted) return NotFound($"Person with id {id} not found.");
            return NoContent();
        }
    }
}