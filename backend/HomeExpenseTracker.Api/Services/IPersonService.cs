using HomeExpenseTracker.Api.Dtos;

namespace HomeExpenseTracker.Api.Services
{
    /// <summary>Business logic for managing people.</summary>
    public interface IPersonService
    {
        Task<IEnumerable<PersonDto>> GetAllAsync();
        Task<PersonDto> CreateAsync(CreatePersonDto dto);
        Task<bool> DeleteAsync(int id);
    }
}