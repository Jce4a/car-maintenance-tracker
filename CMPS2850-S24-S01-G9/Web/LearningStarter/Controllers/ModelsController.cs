using Microsoft.AspNetCore.Mvc;
using LearningStarter.Data;
using LearningStarter.Entities;
using System.Linq;
using LearningStarter.Common;


namespace LearningStarter.Controllers;
[ApiController]
[Route("api/models")]

public class ModelsController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ModelsController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();

        var data = _dataContext
            .Set<Model>()
            .Select(models => new ModelsGetDto
            {
                Id = models.Id,
                Name = models.Name,
                ManufacturerId = models.ManufacturerId

            })
            .ToList();
        response.Data = data;
        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] ModelsCreateDto createDto)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name), "Name is required");
        }
        
        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        var modelsToCreate = new Model
        {
            Name = createDto.Name,
            ManufacturerId = createDto.ManufacturerId
        };
        _dataContext.Set<Model>().Add(modelsToCreate);
        _dataContext.SaveChanges();

        var modelsToReturn = new ModelsGetDto
        {
            Id = modelsToCreate.Id,
            Name = modelsToCreate.Name,
            ManufacturerId = modelsToCreate.ManufacturerId

        };
        response.Data = modelsToReturn;
        return Created("", response);

    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();

        var data = _dataContext
            .Set<Model>()
            .Select(models => new ModelsGetDto
            {
                Id = models.Id,
                Name = models.Name,
                ManufacturerId = models.ManufacturerId

            })
            .FirstOrDefault(models => models.Id == id);
        response.Data = data;
        return Ok(response); 
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ModelsUpdateDto updateDto, int id)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name).ToLower(), "Name is required");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var modelsToUpdate = _dataContext.Set<Model>()
            .FirstOrDefault(models => models.Id == id);
        
        modelsToUpdate.Name = updateDto.Name;
        modelsToUpdate.ManufacturerId = updateDto.ManufacturerId;
        _dataContext.SaveChanges();
    

    var modelToReturn = new ModelsGetDto
        {
            Id = modelsToUpdate.Id,
            Name = modelsToUpdate.Name,
            ManufacturerId = modelsToUpdate.ManufacturerId,
        };
        response.Data = modelToReturn;
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var modelsToDelete = _dataContext.Set<Model>()
            .FirstOrDefault(models => models.Id == id);
        if (modelsToDelete == null)
        {
            response.AddError("id", "model not found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        _dataContext.Set<Model> ().Remove(modelsToDelete);
        _dataContext.SaveChanges();
        response.Data = true;
        return Ok(response);
        
    }
    
}