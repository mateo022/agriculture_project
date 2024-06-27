namespace RestAPIBackendWebService.Domain.Farm.DTOs
{
    public class FarmRequestDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public decimal Hectares { get; set; }
        public string Description { get; set; }
    }
}
