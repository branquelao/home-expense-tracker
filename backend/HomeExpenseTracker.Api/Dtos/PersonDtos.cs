namespace HomeExpenseTracker.Api.Dtos
{
    /// <summary>Data returned to the client representing a person.</summary>
    public record PersonDto(int Id, string Name, int Age);

    /// <summary>Data required to create a new person.</summary>
    public record CreatePersonDto(string Name, int Age);
}