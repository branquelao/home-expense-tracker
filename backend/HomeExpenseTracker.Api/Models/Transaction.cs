namespace HomeExpenseTracker.Api.Models
{
    /// <summary>Type of a financial transaction.</summary>
    public enum TransactionType
    {
        Income = 0,
        Expense = 1
    }

    /// <summary>A financial transaction (income or expense) linked to a person.</summary>
    public class Transaction
    {
        public int Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public decimal Value { get; set; }

        public TransactionType Type { get; set; }

        /// <summary>Foreign key to the owning person.</summary>
        public int PersonId { get; set; }

        public Person? Person { get; set; }
    }
}