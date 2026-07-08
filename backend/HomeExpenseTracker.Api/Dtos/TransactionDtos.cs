using HomeExpenseTracker.Api.Models;

namespace HomeExpenseTracker.Api.Dtos
{
    /// <summary>Data returned to the client representing a transaction.</summary>
    public record TransactionDto(int Id, string Description, decimal Value, TransactionType Type, int PersonId);

    /// <summary>Data required to create a new transaction.</summary>
    public record CreateTransactionDto(string Description, decimal Value, TransactionType Type, int PersonId);

    /// <summary>Data required to update an existing transaction.</summary>
    public record UpdateTransactionDto(string Description, decimal Value, TransactionType Type, int PersonId);
}