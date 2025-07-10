using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities
{
    public class MaintenanceRecord
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public int ServiceProviderId { get; set; }
        public int MaintenanceTaskId { get; set; }
        public DateTimeOffset Date { get; set; }
        public int Mileage { get; set; }
        public decimal LabourCost { get; set; }
        public decimal TotalCost { get; set; }
        public string Notes { get; set; }

        public MaintenanceTask MaintenanceTask { get; set; }
        public ServiceProvider ServiceProvider { get; set; } // FIXED: was 'object'
    }

    public class MaintenanceRecordCreateDto
    {
        public int CarId { get; set; }
        public int ServiceProviderId { get; set; }
        public int MaintenanceTaskId { get; set; }
        public DateTimeOffset Date { get; set; }
        public int Mileage { get; set; }
        public decimal LabourCost { get; set; }
        public decimal TotalCost { get; set; }
        public string Notes { get; set; }
    }

    public class MaintenanceRecordUpdateDto
    {
        public int CarId { get; set; }
        public int ServiceProviderId { get; set; }
        public int MaintenanceTaskId { get; set; }
        public DateTimeOffset Date { get; set; }
        public int Mileage { get; set; }
        public decimal LabourCost { get; set; }
        public decimal TotalCost { get; set; }
        public string Notes { get; set; }
    }

    public class MaintenanceRecordGetDto
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public int ServiceProviderId { get; set; }
        public int MaintenanceTaskId { get; set; }
        public DateTimeOffset Date { get; set; }
        public int Mileage { get; set; }
        public decimal LabourCost { get; set; }
        public decimal TotalCost { get; set; }
        public string Notes { get; set; }

        public string ServiceProviderName { get; set; }
        public string MaintenanceTaskName { get; set; }
    }

    public class MaintenanceRecordEntityConfiguration : IEntityTypeConfiguration<MaintenanceRecord>
    {
        public void Configure(EntityTypeBuilder<MaintenanceRecord> builder)
        {
            builder.ToTable("MaintenanceRecords");

            builder.HasOne(m => m.MaintenanceTask)
                   .WithMany()
                   .HasForeignKey(m => m.MaintenanceTaskId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(m => m.ServiceProvider)
                   .WithMany()
                   .HasForeignKey(m => m.ServiceProviderId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}