using RestAPIBackendWebService.Domain.Lot.Models;

namespace RestAPIBackendWebService.Domain.Group.Models
{
    public class GroupModel
    {
        public int Id { get; set; }
        public int LotId { get; set; }
        public string Name { get; set; }
        public LotModel Lot { get; set; }
    }
}
