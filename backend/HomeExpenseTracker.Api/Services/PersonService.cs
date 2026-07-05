using Microsoft.EntityFrameworkCore;
using HomeExpenseTracker.Api.Data;
using HomeExpenseTracker.Api.Dtos;
using HomeExpenseTracker.Api.Models;

namespace HomeExpenseTracker.Api.Services
{
    public class PersonService : IPersonService
    {
        private readonly AppDbContext _context;

        public PersonService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Returns all registered people.</summary>
        public async Task<IEnumerable<PersonDto>> GetAllAsync()
        {
            return await _context.People
                .Select(p => new PersonDto(p.Id, p.Name, p.Age))
                .ToListAsync();
        }

        /// <summary>Creates a new person.</summary>
        public async Task<PersonDto> CreateAsync(CreatePersonDto dto)
        {
            var person = new Person { Name = dto.Name, Age = dto.Age };

            _context.People.Add(person);
            await _context.SaveChangesAsync();

            return new PersonDto(person.Id, person.Name, person.Age);
        }

        /// <summary>Deletes a person; related transactions are removed by cascade delete. Returns false if not found.</summary>
        public async Task<bool> DeleteAsync(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person is null) return false;

            _context.People.Remove(person);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}