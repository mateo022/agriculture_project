using RestAPIBackendWebService.Domain.Common.Models;

namespace RestAPIBackendWebService.Domain.Group.Models
{
    public class GroupResult : BaseResult
    {
        public GroupModel GroupInformation { get; set; }

        public GroupResult() : base() { }
    }
}
