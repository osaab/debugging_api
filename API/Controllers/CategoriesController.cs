using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    public CategoriesController() { }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetCategories()
    {
        await Task.Delay(1000);
        List<Category> categories =
            new()
            {
                new Category { Id = 1, Name = "Category 1" },
                new Category { Id = 2, Name = "Category 2" },
                new Category { Id = 3, Name = "Category 3" },
                new Category { Id = 4, Name = "Category 4" },
                new Category { Id = 5, Name = "Category 5" },
                new Category { Id = 6, Name = "Category 6" },
                new Category { Id = 7, Name = "Category 7" },
                new Category { Id = 8, Name = "Category 8" },
                new Category { Id = 9, Name = "Category 9" },
                new Category { Id = 10, Name = "Category 10" },
            };

        return Ok(categories);
    }
}
