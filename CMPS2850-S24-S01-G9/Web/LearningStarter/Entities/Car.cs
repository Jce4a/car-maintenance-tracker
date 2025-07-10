using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int ModelId { get; set; }
        public Model Model { get; set; }

        public int Year { get; set; }
        public string PlateNumber { get; set; }
    }

    public class CarsGetDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ModelId { get; set; }
        public int Year { get; set; }
        public string PlateNumber { get; set; }

      
        public string ModelName { get; set; }
        public string MakeName { get; set; }
    }

    public class CarsCreateDto
    {
        public int UserId { get; set; }
        public int ModelId { get; set; }
        public int Year { get; set; }
        public string PlateNumber { get; set; }
    }

    public class CarsUpdateDto
    {
        public int UserId { get; set; }
        public int ModelId { get; set; }
        public int Year { get; set; }
        public string PlateNumber { get; set; }
    }

    public class CarsEntityTypeConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder.ToTable("Cars");

            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Model)
                .WithMany()
                .HasForeignKey(x => x.ModelId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}