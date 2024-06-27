using System.Text.RegularExpressions;

namespace RestAPIBackendWebService.Domain.Lot.Entities
{
    public class GroupEntity
    {
        public int Id { get; set; }
        public int LotId { get; set; }
        public string Name { get; set; }

        // Navigation to Lot
        public LotEntity Lot { get; set; }
    }
}
