using System.ComponentModel.DataAnnotations;

namespace RestAPIBackendWebService.Domain.Farm.DTOs
{
    public class FarmCreateDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public decimal Hectares { get; set; }

        public string Description { get; set; }
    }
}
