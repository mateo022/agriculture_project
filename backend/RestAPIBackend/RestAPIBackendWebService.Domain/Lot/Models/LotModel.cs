using RestAPIBackendWebService.Domain.Farm.Models;
using System.Text.RegularExpressions;

namespace RestAPIBackendWebService.Domain.Lot.Models
{
    public class LotModel
    {
        public int Id { get; set; }
        public int FarmId { get; set; }
        public string Name { get; set; }
        public int Trees { get; set; }
        public string Stage { get; set; }

        public FarmModel Farm { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}
