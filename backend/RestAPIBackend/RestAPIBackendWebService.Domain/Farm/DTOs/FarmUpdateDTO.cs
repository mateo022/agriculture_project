using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestAPIBackendWebService.Domain.Farm.DTOs
{
    public class FarmUpdateDTO
    {

        public string Name { get; set; }

        public string Location { get; set; }

        public decimal Hectares { get; set; }

        public string Description { get; set; }
    }
}
