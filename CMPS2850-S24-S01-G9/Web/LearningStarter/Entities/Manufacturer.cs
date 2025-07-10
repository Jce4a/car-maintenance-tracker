using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class Manufacturer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Model> Models { get; set; }
}

public class ManufacturerGetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<ModelsGetDto> Models { get; set; }
}

public class ManufacturerCreateDto
{
    public string Name { get; set; }
}

public class ManufacturerUpdateDto
{
    public string Name { get; set; }
}

public class ManufacturerEntityTypeConfiguration : IEntityTypeConfiguration<Manufacturer>
{
    public void Configure(EntityTypeBuilder<Manufacturer> builder)
    {
        builder.ToTable("Manufacturers");

        builder.HasMany(x => x.Models)
            .WithOne(x => x.Manufacturer)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
