using Microsoft.AspNetCore.Mvc;
using HomeExpenseTracker.Api.Dtos;
using HomeExpenseTracker.Api.Exceptions;
using HomeExpenseTracker.Api.Services;

namespace HomeExpenseTracker.Api.Controllers
{
    [ApiController]
    [Route("api/transactions")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionsController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        /// <summary>Lists all registered transactions.</summary>
        [HttpGet]
        public async Task<ActionResult<PagedResultDto<TransactionDto>>> GetAll(
            [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            return Ok(await _transactionService.GetAllAsync(pageNumber, pageSize));
        }

        /// <summary>Creates a new transaction, validating the minor-only-expense rule.</summary>
        [HttpPost]
        public async Task<ActionResult<TransactionDto>> Create(CreateTransactionDto dto)
        {
            try
            {
                var created = await _transactionService.CreateAsync(dto);
                if (created is null) return NotFound($"Person with id {dto.PersonId} not found.");
                return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Updates an existing transaction, validating the minor-only-expense rule.</summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<TransactionDto>> Update(int id, UpdateTransactionDto dto)
        {
            try
            {
                var updated = await _transactionService.UpdateAsync(id, dto);
                if (updated is null) return NotFound($"Transaction with id {id} or person with id {dto.PersonId} not found.");
                return Ok(updated);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}