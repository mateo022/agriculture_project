using Microsoft.AspNetCore.Mvc;
using RestAPIBackendWebService.Domain.Common.DTOs;
using RestAPIBackendWebService.Domain.Common.Errors;
using RestAPIBackendWebService.Services.Logger.Contract;
using RestAPIBackendWebService.Services.Logger.Logic;
using System.Net;

namespace RestAPIBackendWebService.Extensions
{
    public static class ServicesExtension
    {
        public const string DEVELOPMENT_CORS = "_developmentCorsPolicy";
        public const string COMMON_CORS = "_commonCorsPolicy";
        public const string STAGING_CORS = "_stageCorsPolicy";

        public static void RegisterDependencies(this IServiceCollection services)
        {
            // Register your services here
            services.AddSingleton<ILoggerService, LoggerService>();

            // Add other service registrations here
        }

        public static void ConfigureApiVersion(this IServiceCollection services)
        {
            services.AddApiVersioning(o =>
            {
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new Asp.Versioning.ApiVersion(1, 0);
                o.ReportApiVersions = true;
            });
        }

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });

                options.AddPolicy(DEVELOPMENT_CORS, policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        public static void ConfigureResponseForInvalidModelsState(this IMvcBuilder apiBuilder)
        {
            apiBuilder.ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = (errorContext) =>
                {
                    var errors = new RequestFieldsErrorsCollection<string>();

                    foreach (var propertyValue in errorContext.ModelState.Keys)
                    {
                        var valueErrors = new List<string>();

                        foreach (var error in errorContext.ModelState[propertyValue].Errors)
                        {
                            valueErrors.Add(error.ErrorMessage);
                        }

                        errors.AddErrorsForKey(propertyValue, valueErrors);
                    }

                    return new BadRequestObjectResult(new ErrorResponseDTO<object>
                    {
                        StatusCode = (int)HttpStatusCode.BadRequest,
                        Message = "Failed validations",
                        Errors = errors.Collection
                    });
                };
            });
        }
    }
}
