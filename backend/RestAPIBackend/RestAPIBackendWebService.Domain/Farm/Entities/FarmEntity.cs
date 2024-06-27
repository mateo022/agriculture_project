using System.Text.RegularExpressions;

namespace RestAPIBackendWebService.Domain.Lot.Entities
{
    public class FarmEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public decimal Hectares { get; set; }
        public string Description { get; set; }

        // Navigation to the collection of Lots
        public ICollection<LotEntity> Lots { get; set; }
    }
}
