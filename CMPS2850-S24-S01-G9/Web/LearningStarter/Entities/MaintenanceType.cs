using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class MaintenanceType
{
    public int Id { get; set; }
    public string Name { get; set; }
}


public class MaintenanceTypeGetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
 
}

public class MaintenanceTypeCreateDto
{
    public string Name { get; set; }
}

public class MaintenanceTypeUpdateDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class MaintenanceTypesEntityTypeConfiguration : IEntityTypeConfiguration<MaintenanceType>
{
    public void Configure(EntityTypeBuilder<MaintenanceType> builder)
    {
        builder.ToTable("MaintenanceTypes");  
    }
}