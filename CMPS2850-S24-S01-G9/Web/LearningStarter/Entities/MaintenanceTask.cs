using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;
public class MaintenanceTask
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int MaintenanceTypeId { get; set; }
    
    public int MaintenanceId { get; set; }
    public string TaskNotes { get; set; }
}

public class MaintenanceTaskGetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int MaintenanceTypeId { get; set; }

    public int MaintenanceId { get; set; }
    public string TaskNotes { get; set; }
    public string Username { get; set; }

    public class MaintenanceTaskCreateDto
    {
        public string Name { get; set; }
        public int MaintenanceTypeId { get; set; }

        public int MaintenanceId { get; set; }
        public string TaskNotes { get; set; }
    }

    public class MaintenanceTaskUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaintenanceTypeId { get; set; }
        public int MaintenanceId { get; set; }
        public string TaskNotes { get; set; }
    }

    public class MaintenanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<MaintenanceTask>
    {
        public void Configure(EntityTypeBuilder<MaintenanceTask> builder)
        {
            builder.ToTable("MaintenanceTask");
        }
    }
}