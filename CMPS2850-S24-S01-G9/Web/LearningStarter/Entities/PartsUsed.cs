namespace LearningStarter.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class PartUsed
{
    public int Id { get; set; }
    public int MaintenanceId { get; set; }
    public string Name { get; set; }
    public decimal Cost { get; set; }
    public string WarrantyStatus { get; set; }
}

public class PartUsedCreateDto
{
    public string Name { get; set; }
    public decimal Cost { get; set; }
    public string WarrantyStatus { get; set; }
}

public class PartUsedUpdateDto
{
    public string Name { get; set; }
    public decimal Cost { get; set; }
    public string WarrantyStatus { get; set; }
}

public class PartUsedGetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Cost { get; set; }
    public string WarrantyStatus { get; set; }
}

public class PartUsedEntityConfiguration : IEntityTypeConfiguration<PartUsed>
{
    public void Configure(EntityTypeBuilder<PartUsed> builder)
    {
        builder.ToTable("PartsUsed");
    }
}