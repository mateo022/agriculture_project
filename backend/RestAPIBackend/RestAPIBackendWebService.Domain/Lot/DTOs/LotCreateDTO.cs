﻿namespace RestAPIBackendWebService.Domain.Lot.DTOs
{
    public class LotCreateDTO
    {
        public int FarmId { get; set; }
        public string Name { get; set; }
        public int Trees { get; set; }
        public string Stage { get; set; }
    }
}