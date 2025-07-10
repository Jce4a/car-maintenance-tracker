using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class ServiceProvider
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public int BusinessId { get; set; }
    public Business Business { get; set; }
}

public class ServiceProviderGetDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public int BusinessId { get; set; }
}

public class ServiceProviderCreateDto
{
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public int BusinessId { get; set; }
}

public class ServiceProviderUpdateDto
{
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public int BusinessId { get; set; }
}

public class ServiceProviderTypeConfiguration : IEntityTypeConfiguration<ServiceProvider>
{
    public void Configure(EntityTypeBuilder<ServiceProvider> builder)
    {
        builder.ToTable("ServiceProvider");
        
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Business).WithMany(x => x.ServiceProviders).HasForeignKey(x => x.BusinessId);
    }
}