using HomeExpenseTracker.Api.Dtos;

namespace HomeExpenseTracker.Api.Services
{
    /// <summary>Business logic for computing income/expense/balance totals.</summary>
    public interface ITotalsService
    {
        Task<TotalsResponseDto> GetTotalsAsync();
    }
}