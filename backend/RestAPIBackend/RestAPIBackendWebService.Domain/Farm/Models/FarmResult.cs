using RestAPIBackendWebService.Domain.Common.Models;

namespace RestAPIBackendWebService.Domain.Farm.Models
{
    public class FarmResult : BaseResult
    {
        public FarmModel FarmInformation { get; set; }

        public FarmResult() : base() { }
    }
}
