using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/business")]

public class BusinessController : ControllerBase
{
    private readonly DataContext _dataContext;
    public BusinessController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Business>()
            .Select(business => new BusinessGetDto
            {
                Id = business.Id,
                Name = business.Name,
                PhoneNumber = business.PhoneNumber,
                Address = business.Address,
                ServiceProviders = business.ServiceProviders.Select(x => new ServiceProviderGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    PhoneNumber = x.PhoneNumber,
                    BusinessId = x.BusinessId
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
            .Set<Business>()
            .Select(business => new BusinessGetDto
            {
                Id = business.Id,
                Name = business.Name,
                PhoneNumber = business.PhoneNumber,
                Address = business.Address,
                ServiceProviders = business.ServiceProviders.Select(x => new ServiceProviderGetDto
                    {
                    Id = x.Id,
                    Name = x.Name,
                    PhoneNumber = x.PhoneNumber,
                    BusinessId = x.BusinessId
                    }).ToList()
            })
            .FirstOrDefault(business => business.Id == id);
        
        response.Data = data;
        
        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] BusinessCreateDto createDto)
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
        
        var businessToCreate = new Business
        {
            Name = createDto.Name,
            PhoneNumber = createDto.PhoneNumber,
            Address = createDto.Address
        };
        
        _dataContext.Set<Business>().Add(businessToCreate);
        _dataContext.SaveChanges();

        var businessToReturn = new BusinessGetDto
        {
            Id = businessToCreate.Id,
            Name = businessToCreate.Name,
            PhoneNumber = businessToCreate.PhoneNumber,
            Address = businessToCreate.Address
        };
        
        response.Data = businessToReturn;
        
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] BusinessUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name),"Name must not be empty");
        }
        
        var businessToUpdate = _dataContext.Set<Business>()
            .FirstOrDefault(business => business.Id == id);
        
        if (businessToUpdate == null)
        {
            response.AddError("id","No Business found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        
        businessToUpdate.Name = updateDto.Name;
        businessToUpdate.PhoneNumber = updateDto.PhoneNumber;
        businessToUpdate.Address = updateDto.Address;
        
        _dataContext.SaveChanges();

        var businessToReturn = new BusinessGetDto
        {
            Id = businessToUpdate.Id,
            Name = businessToUpdate.Name,
            PhoneNumber = businessToUpdate.PhoneNumber,
            Address = businessToUpdate.Address
        };
        
        response.Data = businessToReturn;
        
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var businessToDelete = _dataContext.Set<Business>()
            .FirstOrDefault(business => business.Id == id);

        if (businessToDelete == null)
        {
            response.AddError("id","No business found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }
        _dataContext.Set<Business>().Remove(businessToDelete);
        _dataContext.SaveChanges();
        response.Data = true;
        return Ok(response);
    }
    
    
}