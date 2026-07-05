using Microsoft.EntityFrameworkCore;
using HomeExpenseTracker.Api.Models;

namespace HomeExpenseTracker.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Person> People { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Cascade delete: removing a person removes their transactions too.
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Person)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PersonId)
                .OnDelete(DeleteBehavior.Cascade);

            // Explicit decimal precision to avoid rounding issues in SQLite.
            modelBuilder.Entity<Transaction>()
                .Property(t => t.Value)
                .HasColumnType("decimal(18,2)");
        }
    }
}