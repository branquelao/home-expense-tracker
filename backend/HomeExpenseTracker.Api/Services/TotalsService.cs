using Microsoft.EntityFrameworkCore;
using HomeExpenseTracker.Api.Data;
using HomeExpenseTracker.Api.Dtos;
using HomeExpenseTracker.Api.Models;

namespace HomeExpenseTracker.Api.Services
{
    public class TotalsService : ITotalsService
    {
        private readonly AppDbContext _context;

        public TotalsService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Computes income, expense and balance totals per person, plus the grand totals.</summary>
        public async Task<TotalsResponseDto> GetTotalsAsync()
        {
            var people = await _context.People
                .Include(p => p.Transactions)
                .ToListAsync();

            var personTotals = people.Select(p =>
            {
                var income = p.Transactions.Where(t => t.Type == TransactionType.Income).Sum(t => t.Value);
                var expense = p.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(t => t.Value);
                return new PersonTotalsDto(p.Id, p.Name, income, expense, income - expense);
            }).ToList();

            var grandIncome = personTotals.Sum(p => p.TotalIncome);
            var grandExpense = personTotals.Sum(p => p.TotalExpense);

            return new TotalsResponseDto(personTotals, grandIncome, grandExpense, grandIncome - grandExpense);
        }
    }
}