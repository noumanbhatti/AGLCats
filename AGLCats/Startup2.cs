using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Assignment
{
    public partial class Startup
    {
        public void ConfigureAPIVersioning(IServiceCollection services)
        {
            services.AddApiVersioning(option => {
                option.ReportApiVersions = true;
                option.AssumeDefaultVersionWhenUnspecified = true;
                option.DefaultApiVersion = new ApiVersion(1, 0);
            });
        }
    }
}
