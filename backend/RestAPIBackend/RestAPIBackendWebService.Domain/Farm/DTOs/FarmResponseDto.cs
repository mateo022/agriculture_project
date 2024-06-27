namespace RestAPIBackendWebService.Domain.Farm.DTOs
{
    public class FarmResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public decimal Hectares { get; set; }
        public string Description { get; set; }
    }
}
