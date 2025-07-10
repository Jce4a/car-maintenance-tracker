namespace LearningStarter.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class Model
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ManufacturerId { get; set; }
    public Manufacturer Manufacturer { get; set; }
}

public class ModelsCreateDto
{
    public string Name { get; set; }
    public int ManufacturerId { get; set; }
}

public class ModelsUpdateDto
{
    public string Name { get; set; }
    public int ManufacturerId { get; set; }
}

public class ModelsGetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ManufacturerId { get; set; }
}

public class ModelsEntityConfiguration : IEntityTypeConfiguration<Model>
{
    public void Configure(EntityTypeBuilder<Model> builder)
    {
        builder.ToTable("Models");

        builder.HasKey(x => x.Id);
        
        builder.HasOne(x => x.Manufacturer)
            .WithMany(x => x.Models)
            .HasForeignKey(x => x.ManufacturerId);
    }
}

