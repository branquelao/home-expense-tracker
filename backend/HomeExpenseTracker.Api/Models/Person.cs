namespace HomeExpenseTracker.Api.Models
{
    /// <summary>A person registered in the system.</summary>
    public class Person
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        /// <summary>Transactions owned by this person (cascade delete configured in DbContext).</summary>
        public List<Transaction> Transactions { get; set; } = new();
    }
}