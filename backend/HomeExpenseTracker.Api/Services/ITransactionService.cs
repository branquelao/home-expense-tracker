using HomeExpenseTracker.Api.Dtos;

namespace HomeExpenseTracker.Api.Services
{
    /// <summary>Business logic for managing transactions.</summary>
    public interface ITransactionService
    {
        Task<PagedResultDto<TransactionDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<TransactionDto?> CreateAsync(CreateTransactionDto dto);
        Task<TransactionDto?> UpdateAsync(int id, UpdateTransactionDto dto);
    }
}