using Microsoft.EntityFrameworkCore;
using NLog;
using RestAPIBackendWebService.Extensions;
using RestAPIBackendWebService.Middleware;

var builder = WebApplication.CreateBuilder(args);

LogManager.Setup().LoadConfigurationFromFile(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));

//Add services to the container.
builder.Services.AddDbContext<RestAPIDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDB")),
   ServiceLifetime.Scoped,
   ServiceLifetime.Scoped
);
builder.Services.RegisterDependencies();

builder.Services.ConfigureCors();


builder.Services.AddControllers()
    .ConfigureResponseForInvalidModelsState();

builder.Services.ConfigureApiVersion();

builder.Services.AddHttpClient();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseCors(ServicesExtension.DEVELOPMENT_CORS);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ExceptionHandler>();

app.Run();
