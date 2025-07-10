using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers;

[ApiController]
[Route("/api/maintenance-types")]
public class MaintenanceTypesController : ControllerBase
{
    private readonly DataContext _dataContext;
    public MaintenanceTypesController(DataContext dataContext)
    {
        _dataContext = dataContext; 
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        var data = _dataContext
            .Set<MaintenanceType>()
            .Select(maintenanceType => new MaintenanceTypeGetDto
            {
                Id = maintenanceType.Id,
                Name = maintenanceType.Name
            })
            .ToList();
            
        response.Data = data;
        
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();
        var data = _dataContext
            .Set<MaintenanceType>()
            .Select(maintenanceType => new MaintenanceTypeGetDto
            {
                Id = maintenanceType.Id,
                Name = maintenanceType.Name
            })
            .FirstOrDefault(maintenanceType => maintenanceType.Id == id);
            
        response.Data = data;
        
        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] MaintenanceTypeCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.Name))
        {
                response.AddError(nameof(createDto.Name), "Name is must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        var maintenanceTypeToCreate = new MaintenanceType
        {
            Name = createDto.Name,
        };
        _dataContext.Set<MaintenanceType>().Add(maintenanceTypeToCreate);
        _dataContext.SaveChanges();

        var maintenanceTypeToReturn = new MaintenanceTypeGetDto
        {
            Id = maintenanceTypeToCreate.Id,
        };
        response.Data = maintenanceTypeToReturn;
        return Created("", response);
    }
    
    
    [HttpPut("{id}")]

    public IActionResult Update(int id, [FromBody] MaintenanceTypeUpdateDto updateDto)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name).ToLower(), "Name must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        var maintenanceTypeToUpdate  = _dataContext.Set<MaintenanceType>()
            .FirstOrDefault( maintenanceType => maintenanceType.Id == id);
        
        
        if (maintenanceTypeToUpdate == null)
        {
            response.AddError("id", "MaintenanceType not found"); 
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        
        maintenanceTypeToUpdate.Name = updateDto.Name;
        
        _dataContext.SaveChanges();

        var maintenanceTypeToReturn = new MaintenanceTypeGetDto
        {
            Id = maintenanceTypeToUpdate.Id,
            Name = maintenanceTypeToUpdate.Name,
        };
        
        response.Data = maintenanceTypeToReturn;
        return Ok(response);
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) 
    {
    var response = new Response();

     var maintenanceTypeToDelete = _dataContext.Set<MaintenanceType>()
        .FirstOrDefault(maintenanceType => maintenanceType.Id == id);

     if (maintenanceTypeToDelete == null)
     {
        response.AddError("id", "MaintenanceType not found"); 
     }

     if (response.HasErrors)
     {
         return BadRequest(response);
     }
    _dataContext.Set<MaintenanceType>().Remove(maintenanceTypeToDelete);
    _dataContext.SaveChanges();
    
    response.Data = true;
        return Ok(response);
}
}