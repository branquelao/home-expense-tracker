namespace HomeExpenseTracker.Api.Dtos
{
    /// <summary>Income, expense and balance totals for a single person.</summary>
    public record PersonTotalsDto(int PersonId, string Name, decimal TotalIncome, decimal TotalExpense, decimal Balance);

    /// <summary>Per-person totals plus the overall grand totals.</summary>
    public record TotalsResponseDto(
        IEnumerable<PersonTotalsDto> People,
        decimal GrandTotalIncome,
        decimal GrandTotalExpense,
        decimal GrandBalance);
}