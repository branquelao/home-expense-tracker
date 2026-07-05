using HomeExpenseTracker.Api.Dtos;

namespace HomeExpenseTracker.Api.Services
{
    /// <summary>Business logic for managing transactions.</summary>
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllAsync();
        Task<TransactionDto?> CreateAsync(CreateTransactionDto dto);
    }
}