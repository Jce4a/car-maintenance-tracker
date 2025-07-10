using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Common;
using System.Linq;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{
    private readonly DataContext _dataContext;

    public CarsController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();

        var cars = _dataContext.Cars
            .Include(c => c.Model)
            .ThenInclude(m => m.Manufacturer)
            .ToList();

        var data = cars.Select(car => new
        {
            car.Id,
            car.ModelId,
            car.Year,
            car.UserId,
            car.PlateNumber,
            modelName = car.Model?.Name ?? "Unknown",
            makeName = car.Model?.Manufacturer?.Name ?? "Unknown"
        }).ToList();

        response.Data = data;
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();

        var car = _dataContext.Cars
            .Include(c => c.Model)
            .ThenInclude(m => m.Manufacturer)
            .FirstOrDefault(c => c.Id == id);

        if (car == null)
        {
            response.AddError("id", "Car not found");
            return NotFound(response);
        }

        response.Data = new
        {
            car.Id,
            car.ModelId,
            car.Year,
            car.UserId,
            car.PlateNumber,
            modelName = car.Model?.Name ?? "Unknown",
            makeName = car.Model?.Manufacturer?.Name ?? "Unknown"
        };

        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CarsCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.PlateNumber))
        {
            response.AddError(nameof(createDto.PlateNumber), "Plate number is required");
        }

        if (createDto.Year < 1900)
        {
            response.AddError(nameof(createDto.Year), "Car is too old to work on");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var newCar = new Car
        {
            UserId = createDto.UserId,
            ModelId = createDto.ModelId,
            Year = createDto.Year,
            PlateNumber = createDto.PlateNumber
        };

        _dataContext.Cars.Add(newCar);
        _dataContext.SaveChanges();

        response.Data = new
        {
            newCar.Id,
            newCar.ModelId,
            newCar.UserId,
            newCar.Year,
            newCar.PlateNumber
        };

        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] CarsUpdateDto updateDto, int id)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(updateDto.PlateNumber))
        {
            response.AddError(nameof(updateDto.PlateNumber), "Plate number is required");
        }

        if (updateDto.Year < 1900)
        {
            response.AddError(nameof(updateDto.Year), "Car is too old to work on");
        }

        var car = _dataContext.Cars.FirstOrDefault(c => c.Id == id);

        if (car == null)
        {
            response.AddError("id", "Car not found");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        car.PlateNumber = updateDto.PlateNumber;
        car.Year = updateDto.Year;
        car.UserId = updateDto.UserId;

        _dataContext.SaveChanges();

        response.Data = new
        {
            car.Id,
            car.ModelId,
            car.UserId,
            car.Year,
            car.PlateNumber
        };

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();

        var car = _dataContext.Cars.FirstOrDefault(c => c.Id == id);

        if (car == null)
        {
            response.AddError("id", "Car not found");
            return NotFound(response);
        }

        _dataContext.Cars.Remove(car);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}