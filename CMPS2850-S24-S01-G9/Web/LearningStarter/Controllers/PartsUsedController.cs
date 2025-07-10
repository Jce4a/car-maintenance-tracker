using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;


namespace LearningStarter.Controllers
{
   [ApiController]
   [Route("api/parts-used")]
   public class PartUsedController : ControllerBase
   {
       private readonly DataContext _dataContext;
       public PartUsedController(DataContext dataContext)
       {
           _dataContext = dataContext;
       }
       
       [HttpGet]
       public IActionResult GetAll()
       {
           var response = new Response();
           
           var data = _dataContext
               .Set<PartUsed>()
               .Select(partUsed => new PartUsedGetDto
               {
                   Id = partUsed.Id,
                   Name = partUsed.Name,
                   Cost = partUsed.Cost,
                   WarrantyStatus = partUsed.WarrantyStatus
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
               .Set<PartUsed>()
               .Select(partUsed => new PartUsedGetDto
               {
                   Id = partUsed.Id,
                   Name = partUsed.Name,
                   Cost = partUsed.Cost,
                   WarrantyStatus = partUsed.WarrantyStatus
               })
               .FirstOrDefault(partUsed => partUsed.Id == id);

           response.Data = data;
           return Ok(response);
       }
      
       [HttpPost]
       public IActionResult Create([FromBody] PartUsedCreateDto createDto)
       {
           var response = new Response();


           var partUsedToCreate = new PartUsed
           {
               Name = createDto.Name,
               Cost = createDto.Cost,
               WarrantyStatus = createDto.WarrantyStatus
           };


           _dataContext.Set<PartUsed>().Add(partUsedToCreate);
           _dataContext.SaveChanges();


           var partUsedToReturn = new PartUsedGetDto
           {
               Id = partUsedToCreate.Id,
               Name = partUsedToCreate.Name,
               Cost = partUsedToCreate.Cost,
               WarrantyStatus = partUsedToCreate.WarrantyStatus
           };


           response.Data = partUsedToReturn;
           return Created("", response);
       }
  
       [HttpPut("{id}")]
       public IActionResult Update([FromRoute] int id, [FromBody] PartUsedUpdateDto updateDto)
       {
           var response = new Response();


     
           var partUsedToUpdate = _dataContext
               .Set<PartUsed>()
               .FirstOrDefault(p => p.Id == id);


           if (partUsedToUpdate == null)
           {
         
               response.AddError("id", "Part not found");
               return NotFound(response);
           }


     
           partUsedToUpdate.Name = updateDto.Name;
           partUsedToUpdate.Cost = updateDto.Cost;
           partUsedToUpdate.WarrantyStatus = updateDto.WarrantyStatus;


         
           _dataContext.SaveChanges();


    
           var partUsedToReturn = new PartUsedGetDto
           {
               Id = partUsedToUpdate.Id,
               Name = partUsedToUpdate.Name,
               Cost = partUsedToUpdate.Cost,
               WarrantyStatus = partUsedToUpdate.WarrantyStatus
           };


           response.Data = partUsedToReturn;
           return Ok(response);
       }


      
       [HttpDelete("{id}")]
       public IActionResult Delete([FromRoute] int id)
       {
           var response = new Response();


     
           var partUsedToDelete = _dataContext
               .Set<PartUsed>()
               .FirstOrDefault(p => p.Id == id);


           if (partUsedToDelete == null)
           {
        
               response.AddError("id", "Part not found");
               return NotFound(response);
           }


   
           _dataContext.Set<PartUsed>().Remove(partUsedToDelete);
           _dataContext.SaveChanges();


     
           response.Data = null;
           return Ok(response);
       }
   }
}

