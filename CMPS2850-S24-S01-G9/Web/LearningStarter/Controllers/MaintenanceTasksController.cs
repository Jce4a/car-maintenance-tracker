using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers;

[ApiController]
[Route("/api/maintenance-tasks")]
public class MaintenanceTasksController : ControllerBase
{
    private readonly DataContext _dataContext;

    public MaintenanceTasksController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]

    public IActionResult GetAll()
    {
        var response = new Response();

        var data = _dataContext
            .Set<MaintenanceTask>()
            .Select(maintenanceTask => new MaintenanceTaskGetDto
            {
                Id = maintenanceTask.Id,
                Name = maintenanceTask.Name,
                TaskNotes = maintenanceTask.TaskNotes,
                MaintenanceTypeId = maintenanceTask.MaintenanceTypeId,
                MaintenanceId = maintenanceTask.MaintenanceId
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
            .Set<MaintenanceTask>()
            .Select(maintenanceTask => new MaintenanceTaskGetDto
            {
                Id = maintenanceTask.Id,

                Name = maintenanceTask.Name,
                TaskNotes = maintenanceTask.TaskNotes,
                MaintenanceTypeId = maintenanceTask.MaintenanceTypeId,
                MaintenanceId = maintenanceTask.MaintenanceId
            })
            .FirstOrDefault(maintenanceTask => maintenanceTask.Id == id);
        response.Data = data;

        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] MaintenanceTaskGetDto.MaintenanceTaskCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name), "Name must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var maintenanceTaskToCreate = new MaintenanceTask
        {
            Name = createDto.Name,
            MaintenanceTypeId = createDto.MaintenanceTypeId,
            MaintenanceId = createDto.MaintenanceId,
            TaskNotes = createDto.TaskNotes,
        };
        _dataContext.Set<MaintenanceTask>().Add(maintenanceTaskToCreate);
        _dataContext.SaveChanges();

        var maintenanceTaskToReturn = new MaintenanceTaskGetDto
        {
            Id = maintenanceTaskToCreate.Id,
        };
        response.Data = maintenanceTaskToReturn;
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] MaintenanceTaskGetDto.MaintenanceTaskUpdateDto updateDto)
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

        var maintenanceTaskToUpdate = _dataContext.Set<MaintenanceTask>()
            .FirstOrDefault(maintenanceTask => maintenanceTask.Id == id);

        if (maintenanceTaskToUpdate == null)
        {
            response.AddError(nameof(updateDto.Name), "MaintenanceTask not found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        maintenanceTaskToUpdate.Name = updateDto.Name;
        maintenanceTaskToUpdate.TaskNotes = updateDto.TaskNotes;
        maintenanceTaskToUpdate.MaintenanceTypeId = updateDto.MaintenanceTypeId;
        maintenanceTaskToUpdate.MaintenanceId = updateDto.MaintenanceId;

        _dataContext.SaveChanges();

        var maintenanceTaskToReturn = new MaintenanceTaskGetDto()
        {
            Id = maintenanceTaskToUpdate.Id,
            Name = maintenanceTaskToUpdate.Name,
            TaskNotes = maintenanceTaskToUpdate.TaskNotes,
            MaintenanceTypeId = maintenanceTaskToUpdate.MaintenanceTypeId,
            MaintenanceId = maintenanceTaskToUpdate.MaintenanceId
        };
        
        response.Data = maintenanceTaskToReturn;
        return Ok(response);

    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();

        var maintenanceTaskToDelete = _dataContext.Set<MaintenanceTask>()
            .FirstOrDefault(maintenanceTask => maintenanceTask.Id == id);

        if (maintenanceTaskToDelete == null)
        {
            response.AddError("id", "MaintenanceTask not found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        _dataContext.Set<MaintenanceTask>().Remove(maintenanceTaskToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}

