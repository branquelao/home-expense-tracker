using Microsoft.EntityFrameworkCore;
using HomeExpenseTracker.Api.Data;
using HomeExpenseTracker.Api.Dtos;
using HomeExpenseTracker.Api.Exceptions;
using HomeExpenseTracker.Api.Models;

namespace HomeExpenseTracker.Api.Services
{
    public class TransactionService : ITransactionService
    {
        private const int MinorAgeLimit = 18;
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Returns all registered transactions.</summary>
        public async Task<IEnumerable<TransactionDto>> GetAllAsync()
        {
            return await _context.Transactions
                .Select(t => new TransactionDto(t.Id, t.Description, t.Value, t.Type, t.PersonId))
                .ToListAsync();
        }

        /// <summary>Creates a transaction. Returns null if the person does not exist.</summary>
        /// <exception cref="DomainException">Thrown when a minor is registered with an income transaction.</exception>
        public async Task<TransactionDto?> CreateAsync(CreateTransactionDto dto)
        {
            var person = await _context.People.FindAsync(dto.PersonId);
            if (person is null) return null;

            // Business rule: people under 18 can only register expenses.
            if (person.Age < MinorAgeLimit && dto.Type == TransactionType.Income)
            {
                throw new DomainException("Minors (under 18) can only register expense transactions.");
            }

            var transaction = new Transaction
            {
                Description = dto.Description,
                Value = dto.Value,
                Type = dto.Type,
                PersonId = dto.PersonId
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return new TransactionDto(transaction.Id, transaction.Description, transaction.Value, transaction.Type, transaction.PersonId);
        }

        /// <summary>Updates an existing transaction. Returns null if the transaction or the person does not exist.</summary>
        /// <exception cref="DomainException">Thrown when a minor is updated with an income transaction.</exception>
        public async Task<TransactionDto?> UpdateAsync(int id, UpdateTransactionDto dto)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null) return null;

            var person = await _context.People.FindAsync(dto.PersonId);
            if (person is null) return null;

            // Business rule: people under 18 can only register expenses.
            if (person.Age < MinorAgeLimit && dto.Type == TransactionType.Income)
            {
                throw new DomainException("Minors (under 18) can only register expense transactions.");
            }

            transaction.Description = dto.Description;
            transaction.Value = dto.Value;
            transaction.Type = dto.Type;
            transaction.PersonId = dto.PersonId;

            await _context.SaveChangesAsync();

            return new TransactionDto(transaction.Id, transaction.Description, transaction.Value, transaction.Type, transaction.PersonId);
        }
    }
}