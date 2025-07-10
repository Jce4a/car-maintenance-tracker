using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using LearningStarter.Controllers;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using ServiceProvider = LearningStarter.Entities.ServiceProvider;

namespace LearningStarter;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    private IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors();
        services.AddControllers();

        services.AddHsts(options =>
        {
            options.MaxAge = TimeSpan.MaxValue;
            options.Preload = true;
            options.IncludeSubDomains = true;
        });

        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddIdentity<User, Role>(
                options =>
                {
                    options.SignIn.RequireConfirmedAccount = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 8;
                    options.ClaimsIdentity.UserIdClaimType = JwtClaimTypes.Subject;
                    options.ClaimsIdentity.UserNameClaimType = JwtClaimTypes.Name;
                    options.ClaimsIdentity.RoleClaimType = JwtClaimTypes.Role;
                })
            .AddEntityFrameworkStores<DataContext>();

        services.AddMvc();

        services
            .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

        services.AddAuthorization();

        // Swagger
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Learning Starter Server",
                Version = "v1",
                Description = "Description for the API goes here.",
            });

            c.CustomOperationIds(apiDesc => apiDesc.TryGetMethodInfo(out var methodInfo) ? methodInfo.Name : null);
            c.MapType(typeof(IFormFile), () => new OpenApiSchema { Type = "file", Format = "binary" });
        });

        services.AddSpaStaticFiles(config =>
        {
            config.RootPath = "learning-starter-web/build";
        });

        services.AddHttpContextAccessor();

        // configure DI for application services
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
    {
        dataContext.Database.EnsureDeleted();
        dataContext.Database.EnsureCreated();
        
        app.UseHsts();
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseSpaStaticFiles();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        // global cors policy
        app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

        // Enable middleware to serve generated Swagger as a JSON endpoint.
        app.UseSwagger(options =>
        {
            options.SerializeAsV2 = true;
        });

        // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
        // specifying the Swagger JSON endpoint.
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Learning Starter Server API V1");
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(x => x.MapControllers());

        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "learning-starter-web";
            if (env.IsDevelopment())
            {
                spa.UseProxyToSpaDevelopmentServer("http://localhost:3001");
            }
        });
        
        using var scope = app.ApplicationServices.CreateScope();
        var userManager = scope.ServiceProvider.GetService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetService<RoleManager<Role>>();

        SeedRoles(dataContext, roleManager).Wait();
        SeedUsers(dataContext, userManager).Wait();
        SeedManufacturers(dataContext);
        SeedModels(dataContext);
        SeedBusiness(dataContext);
        SeedServiceProvider(dataContext);
        SeedMaintenanceTypes(dataContext);
        SeedMaintenanceTasks(dataContext);
    }

    private static void SeedMaintenanceTypes(DataContext dataContext)
    {
        if (dataContext.Set<MaintenanceType>().Any())
        {
            return;
        }


        var seededMaintenanceType1 = new MaintenanceType
        {
            Name = "Preventive",
        };
        
        var seededMaintenanceType2 = new MaintenanceType
        {
            Name = "Predictive",
        };
        
        var seededMaintenanceType3 = new MaintenanceType
        {
            Name = "Corrective",
        };
        
        var seededMaintenanceType4 = new MaintenanceType
        {
            Name = "Scheduled Maintenance",
        };
        
        var seededMaintenanceType5 = new MaintenanceType
        {
            Name = "Emergency Maintenance",
        };
        
        
        dataContext.Set<MaintenanceType>().Add(seededMaintenanceType1);
        dataContext.Set<MaintenanceType>().Add(seededMaintenanceType2);
        dataContext.Set<MaintenanceType>().Add(seededMaintenanceType3);
        dataContext.Set<MaintenanceType>().Add(seededMaintenanceType4);
        dataContext.Set<MaintenanceType>().Add(seededMaintenanceType5);
        dataContext.SaveChanges();
    }
    
    private static void SeedMaintenanceTasks(DataContext dataContext)
    {
        if (dataContext.Set<MaintenanceTask>().Any())
        {
            return;
        }


        var seededMaintenanceTask1 = new MaintenanceTask
        {
            Name = "Brake inspections",
            TaskNotes = "Regular checks of brake pads, rotors, fluid, and lines to ensure safety and prevent costly repairs."
        };
        
        var seededMaintenanceTask2 = new MaintenanceTask
        {
            Name = "Battery voltage & health monitoring",
            TaskNotes = "Track battery charge, voltage and overall monitoring to prevent unexpected failures."
        };
        
        var seededMaintenanceTask3 = new MaintenanceTask
        {
            Name = "Transmission repair/replacement",
            TaskNotes = "Regular diagnosing of transmission is needed to restore proper vehicle operation."
        };
        
        var seededMaintenanceTask4 = new MaintenanceTask
        {
            Name = "Valve clearance adjustment.",
            TaskNotes = "Adjust gap between valve and rocker arm to improve efficiency and prevent engine damage."
        };
        
        var seededMaintenanceTask5 = new MaintenanceTask
        {
            Name = "Fixing engine overheating",
            TaskNotes = "Check coolant leak, thermostat failure, or radiating blockage to prevent engine damage from excessive heat."
        };
        dataContext.Set<MaintenanceTask>().Add(seededMaintenanceTask1);
        dataContext.Set<MaintenanceTask>().Add(seededMaintenanceTask2);
        dataContext.Set<MaintenanceTask>().Add(seededMaintenanceTask3);
        dataContext.Set<MaintenanceTask>().Add(seededMaintenanceTask4);
        dataContext.Set<MaintenanceTask>().Add(seededMaintenanceTask5);
        dataContext.SaveChanges();
    }

    private static async Task SeedUsers(DataContext dataContext, UserManager<User> userManager)
    {
        var numUsers = dataContext.Users.Count();

        if (numUsers == 0)
        {
            var seededUser = new User
            {
                FirstName = "Seeded",
                LastName = "User",
                UserName = "admin",
            };

            await userManager.CreateAsync(seededUser, "Password");
            await userManager.AddToRoleAsync(seededUser, "Admin");
            await dataContext.SaveChangesAsync();
        }
    }
    
    private static async Task SeedRoles(DataContext dataContext, RoleManager<Role> roleManager)
    {
        var numRoles = dataContext.Roles.Count();

        if (numRoles == 0)
        {
            var seededRole = new Role
            {
                Name = "Admin"
            };

            await roleManager.CreateAsync(seededRole);
            await dataContext.SaveChangesAsync();
        }
    }

    private static void SeedManufacturers(DataContext dataContext)
    {
        if (dataContext.Set<Manufacturer>().Any())
        {
            return;
        }

        var fileName = "ManufacturerData.csv";
        var projectDir = Directory.GetCurrentDirectory();
        var csvFilePath = Path.Combine(projectDir, "Data", fileName);

        string[] lines = File.ReadAllLines(csvFilePath);
        var manufacturersToSeed = new List<Manufacturer>();

        for (int i = 1; i < lines.Length; i++)
        {
            var line = lines[i].Trim();
            var manufacturerName = line.Split(',')[0].Trim();

            if (!string.IsNullOrEmpty(manufacturerName))
            {
                manufacturersToSeed.Add(new Manufacturer
                {
                    Name = manufacturerName
                });
            }
        }

        if (manufacturersToSeed.Any())
        {
            dataContext.Set<Manufacturer>().AddRange(manufacturersToSeed);
            dataContext.SaveChanges();
        }
    }

    /*private static void SeedModels(DataContext dataContext)
    {
        if (dataContext.Set<Model>().Any())
        {
            return;
        }

        var modelsToSeed = new List<Model>()
        {
            new()
            {
                Name = "Camry",
                ManufacturerId = 1
            },
            new()
            {
                Name = "Corolla",
                ManufacturerId = 1
            },
            new()
            {
                Name = "F150",
                ManufacturerId = 2
            },
            new()
            {
                Name = "Accord",
                ManufacturerId = 3
            },
            new()
            {
                Name = "Civic",
                ManufacturerId = 3
            }
        };

        dataContext.Set<Model>().AddRange(modelsToSeed);
        dataContext.SaveChanges();
    }*/

    private static void SeedModels(DataContext dataContext)
    {
        if (dataContext.Set<Model>().Any())
        {
            return;
        }

        var fileName = "ModelData.csv";
        var projectDir = Directory.GetCurrentDirectory();
        var csvFilePath = Path.Combine(projectDir, "Data", fileName);

        string[] lines = File.ReadAllLines(csvFilePath);
        var modelsToSeed = new List<Model>();
        var manufacturers = dataContext.Set<Manufacturer>().ToList();

        for (int i = 1; i < lines.Length; i++)
        {
            var line = lines[i].Trim();
            var parts = line.Split(',');

            var modelName = parts[0].Trim();
            var manufacturerName = parts[1].Trim();

            var manufacturer = manufacturers
                .FirstOrDefault(m => m.Name == manufacturerName);
            
            modelsToSeed.Add(new Model
            {
                Name = modelName,
                ManufacturerId = manufacturer.Id
            });
        }
        
        if (modelsToSeed.Any())
        {
            dataContext.Set<Model>().AddRange(modelsToSeed);
            dataContext.SaveChanges();
        }
    }
    
    private static void SeedBusiness(DataContext dataContext)
    {
        if (dataContext.Set<Business>().Any())
        {
            return;
        }

        var seededBusiness1 = new Business
        {
            Name = "The Tire Shoppe",
            PhoneNumber = "12259237855",
            Address = "29340 Woodside Dr, Walker, LA, 70785"
        };
        
        dataContext.Set<Business>().Add(seededBusiness1);
        dataContext.SaveChanges();
    }

    private static void SeedServiceProvider(DataContext dataContext)
    {
        if (dataContext.Set<ServiceProvider>().Any())
        {
            return;
        }

        var SeededServiceProvider1 = new ServiceProvider
        {
            Name = "John Bungle",
            PhoneNumber = "12259235877",
            BusinessId = 1,
        };
        dataContext.Set<ServiceProvider>().Add(SeededServiceProvider1);
        dataContext.SaveChanges();
    }

}
