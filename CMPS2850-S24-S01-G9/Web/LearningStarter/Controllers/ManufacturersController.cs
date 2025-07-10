using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/manufacturers")]
public class ManufacturersController : ControllerBase
{
    private readonly DataContext _dataContext;
    
    public ManufacturersController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Manufacturer>()
            .Select(manufacturer => new ManufacturerGetDto
            {
                Id = manufacturer.Id,
                Name = manufacturer.Name,
                Models = manufacturer.Models.Select(x => new ModelsGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    ManufacturerId = x.ManufacturerId
                }).ToList()
            }).ToList();

        response.Data = data;
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Manufacturer>()
            .Select(manufacturer => new ManufacturerGetDto
            {
                Id = manufacturer.Id,
                Name = manufacturer.Name,
                Models = manufacturer.Models.Select(x => new ModelsGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    ManufacturerId = x.ManufacturerId
                }).ToList()
            }).FirstOrDefault(manufacturer => manufacturer.Id == id);

        response.Data = data;
        return Ok(response);
    }
    
    [HttpPost]
    public IActionResult Create([FromBody] ManufacturerCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name), "Name must not be empty.");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        var manufacturerToCreate = new Manufacturer
        {
            Name = createDto.Name
        };

        _dataContext.Set<Manufacturer>().Add(manufacturerToCreate);
        _dataContext.SaveChanges();

        var manufacturerToReturn = new ManufacturerGetDto
        {
            Id = manufacturerToCreate.Id,
            Name = manufacturerToCreate.Name
        };

        response.Data = manufacturerToReturn;
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ManufacturerUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name).ToLower(), "Name is required.");
        }
        
        var manufacturerToUpdate = _dataContext.Set<Manufacturer>()
            .FirstOrDefault(manufacturer => manufacturer.Id == id);
        
        if (manufacturerToUpdate == null)
        {
            response.AddError("id", "Manufacturer not found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        manufacturerToUpdate.Name = updateDto.Name;

        _dataContext.SaveChanges();

        var manufacturerToReturn = new ManufacturerGetDto
        {
            Id = manufacturerToUpdate.Id,
            Name = manufacturerToUpdate.Name
        };

        response.Data = manufacturerToReturn;
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();

        var manufacturerToDelete = _dataContext.Set<Manufacturer>()
            .FirstOrDefault(manufacturer => manufacturer.Id == id);

        if (manufacturerToDelete == null)
        {
            response.AddError("id", "Product not found");
        }

        if (response.HasErrors)
        {
            return BadRequest(Response);
        }
        
        _dataContext.Set<Manufacturer>().Remove(manufacturerToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}