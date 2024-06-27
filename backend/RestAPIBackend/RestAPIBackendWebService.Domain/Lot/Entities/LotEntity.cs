using System.Text.RegularExpressions;

namespace RestAPIBackendWebService.Domain.Lot.Entities
{
    public class LotEntity
    {
        public int Id { get; set; }
        public int FarmId { get; set; }
        public string Name { get; set; }
        public int Trees { get; set; }
        public string Stage { get; set; }

        // Navigation to the Farm
        public FarmEntity Farm { get; set; }

        // Navigation to the collection of Groups
        public ICollection<GroupEntity> Groups { get; set; }
    }
}
