using RestAPIBackendWebService.Domain.Lot.Models;

namespace RestAPIBackendWebService.Domain.Farm.Models
{
    public class FarmModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public decimal Hectares { get; set; }
        public string Description { get; set; }

        public ICollection<LotModel> Lots { get; set; }
    }
}
