using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers
{
   [ApiController]
   [Route("api/maintenance-records")]
   public class MaintenanceRecordController : ControllerBase
   {
       private readonly DataContext _dataContext;


       public MaintenanceRecordController(DataContext dataContext)
       {
           _dataContext = dataContext;
       }


       [HttpGet]
       public IActionResult GetAll()
       {
           var response = new Response();
           
           var data = _dataContext
               .Set<MaintenanceRecord>()
               .Select(maintenanceRecord => new MaintenanceRecordGetDto
               {
                   Id = maintenanceRecord.Id,
                   CarId = maintenanceRecord.CarId,
                   ServiceProviderId = maintenanceRecord.ServiceProviderId,
                   Date = maintenanceRecord.Date,
                   Mileage = maintenanceRecord.Mileage,
                   LabourCost = maintenanceRecord.LabourCost,
                   TotalCost = maintenanceRecord.TotalCost,
                   Notes = maintenanceRecord.Notes
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
               .Set<MaintenanceRecord>()
               .Select(maintenanceRecord => new MaintenanceRecordGetDto
               {
                   Id = maintenanceRecord.Id,
                   CarId = maintenanceRecord.CarId,
                   ServiceProviderId = maintenanceRecord.ServiceProviderId,
                   Date = maintenanceRecord.Date,
                   Mileage = maintenanceRecord.Mileage,
                   LabourCost = maintenanceRecord.LabourCost,
                   TotalCost = maintenanceRecord.TotalCost,
                   Notes = maintenanceRecord.Notes
               })
               .FirstOrDefault(maintenanceRecord => maintenanceRecord.Id == id);

           response.Data = data;
           return Ok(response);
       }
       
       [HttpPost]
       public IActionResult Create([FromBody] MaintenanceRecordCreateDto createDto)
       {
           var response = new Response();


           var maintenanceRecordToCreate = new MaintenanceRecord
           {
               CarId = createDto.CarId,
               ServiceProviderId = createDto.ServiceProviderId,
               Date = createDto.Date,
               Mileage = createDto.Mileage,
               LabourCost = createDto.LabourCost,
               TotalCost = createDto.TotalCost,
               Notes = createDto.Notes
           };


           _dataContext.Set<MaintenanceRecord>().Add(maintenanceRecordToCreate);
           _dataContext.SaveChanges();


           var maintenanceRecordToReturn = new MaintenanceRecordGetDto
           {
               Id = maintenanceRecordToCreate.Id,
               CarId = maintenanceRecordToCreate.CarId,
               ServiceProviderId = maintenanceRecordToCreate.ServiceProviderId,
               Date = maintenanceRecordToCreate.Date,
               Mileage = maintenanceRecordToCreate.Mileage,
               LabourCost = maintenanceRecordToCreate.LabourCost,
               TotalCost = maintenanceRecordToCreate.TotalCost,
               Notes = maintenanceRecordToCreate.Notes
           };


           response.Data = maintenanceRecordToReturn;
           return Created("", response);
       }


      
       [HttpPut("{id}")]
       public IActionResult Update([FromRoute] int id, [FromBody] MaintenanceRecordUpdateDto updateDto)
       {
           var response = new Response();


        
           var recordToUpdate = _dataContext
               .Set<MaintenanceRecord>()
               .FirstOrDefault(r => r.Id == id);


           if (recordToUpdate == null)
           {
             
               response.AddError("id", "Record not found");
               return NotFound(response);
           }


        
           recordToUpdate.CarId = updateDto.CarId;
           recordToUpdate.ServiceProviderId = updateDto.ServiceProviderId;
           recordToUpdate.Date = updateDto.Date;
           recordToUpdate.Mileage = updateDto.Mileage;
           recordToUpdate.LabourCost = updateDto.LabourCost;
           recordToUpdate.TotalCost = updateDto.TotalCost;
           recordToUpdate.Notes = updateDto.Notes;


        
           _dataContext.SaveChanges();


       
           var maintenanceRecordToReturn = new MaintenanceRecordGetDto
           {
               Id = recordToUpdate.Id,
               CarId = recordToUpdate.CarId,
               ServiceProviderId = recordToUpdate.ServiceProviderId,
               Date = recordToUpdate.Date,
               Mileage = recordToUpdate.Mileage,
               LabourCost = recordToUpdate.LabourCost,
               TotalCost = recordToUpdate.TotalCost,
               Notes = recordToUpdate.Notes
           };


           response.Data = maintenanceRecordToReturn;
           return Ok(response);
       }
      
       [HttpDelete("{id}")]
       public IActionResult Delete([FromRoute] int id)
       {
           var response = new Response();


    
           var recordToDelete = _dataContext
               .Set<MaintenanceRecord>()
               .FirstOrDefault(r => r.Id == id);


           if (recordToDelete == null)
           {
             
               response.AddError("id", "Record not found");
               return NotFound(response);
           }


      
           _dataContext.Set<MaintenanceRecord>().Remove(recordToDelete);
           _dataContext.SaveChanges();


          
           response.Data = null;
           return Ok(response);
       }
   }
}

