namespace HomeExpenseTracker.Api.Dtos
{
    /// <summary>Generic wrapper for paginated results.</summary>
    public record PagedResultDto<T>(IEnumerable<T> Items, int TotalCount, int PageNumber, int PageSize);
}