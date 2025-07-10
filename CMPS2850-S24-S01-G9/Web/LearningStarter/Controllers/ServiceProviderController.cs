using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/service-provider")]

public class ServiceProviderController : ControllerBase
{
    private readonly DataContext _dataContext;
    public ServiceProviderController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<ServiceProvider>()
            .Select(serviceProvider => new ServiceProviderGetDto
            {
                Id = serviceProvider.Id,
                Name = serviceProvider.Name,
                PhoneNumber = serviceProvider.PhoneNumber,
                BusinessId = serviceProvider.BusinessId
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
            .Set<ServiceProvider>()
            .Select(serviceProvider => new ServiceProviderGetDto
            {
                Id = serviceProvider.Id,
                Name = serviceProvider.Name,
                PhoneNumber = serviceProvider.PhoneNumber,
                BusinessId = serviceProvider.BusinessId
            })
            .FirstOrDefault(serviceProvider => serviceProvider.Id == id);

        response.Data = data;

        return Ok(response);
    }
    [HttpPost]
    public IActionResult Create([FromBody] ServiceProviderCreateDto createDto)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name),"Name must not be empty");
        }
        
        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        var serviceProviderToCreate = new ServiceProvider
        {
            Name = createDto.Name,
            PhoneNumber = createDto.PhoneNumber,
            BusinessId = createDto.BusinessId
        };
        
        _dataContext.Set<ServiceProvider>().Add(serviceProviderToCreate);
        _dataContext.SaveChanges();

        var serviceProviderToReturn = new ServiceProviderGetDto
        {
            Id = serviceProviderToCreate.Id,
            Name = serviceProviderToCreate.Name,
            PhoneNumber = serviceProviderToCreate.PhoneNumber,
            BusinessId = serviceProviderToCreate.BusinessId
        };
        
        response.Data = serviceProviderToReturn;
        
        return Created("", response);
    }
    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ServiceProviderUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name),"Name must not be empty");
        }
        
        var serviceProviderToUpdate = _dataContext.Set<ServiceProvider>()
            .FirstOrDefault(serviceProvider => serviceProvider.Id == id);
        
        if (serviceProviderToUpdate == null)
        {
            response.AddError("id","No ServiceProvider found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        serviceProviderToUpdate.Name = updateDto.Name;
        serviceProviderToUpdate.PhoneNumber = updateDto.PhoneNumber;
        serviceProviderToUpdate.BusinessId = updateDto.BusinessId;
        
        _dataContext.SaveChanges();

        var serviceProviderToReturn = new ServiceProviderGetDto
        {
            Id = serviceProviderToUpdate.Id,
            Name = serviceProviderToUpdate.Name,
            PhoneNumber = serviceProviderToUpdate.PhoneNumber,
            BusinessId = serviceProviderToUpdate.BusinessId
        };
        
        response.Data = serviceProviderToReturn;
        
        return Ok(response);
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var serviceProviderToDelete = _dataContext.Set<ServiceProvider>()
            .FirstOrDefault(serviceProvider => serviceProvider.Id == id);

        if (serviceProviderToDelete == null)
        {
            response.AddError("id","No serviceProvider found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        _dataContext.Set<ServiceProvider>().Remove(serviceProviderToDelete);
        _dataContext.SaveChanges();
        response.Data = true;
        return Ok(response);
    }
}