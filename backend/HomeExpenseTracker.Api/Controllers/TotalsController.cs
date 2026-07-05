using Microsoft.AspNetCore.Mvc;
using HomeExpenseTracker.Api.Services;

namespace HomeExpenseTracker.Api.Controllers
{
    [ApiController]
    [Route("api/totals")]
    public class TotalsController : ControllerBase
    {
        private readonly ITotalsService _totalsService;

        public TotalsController(ITotalsService totalsService)
        {
            _totalsService = totalsService;
        }

        /// <summary>Returns income/expense/balance totals per person and overall.</summary>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _totalsService.GetTotalsAsync());
        }
    }
}