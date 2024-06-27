using RestAPIBackendWebService.Domain.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestAPIBackendWebService.Domain.Lot.Models
{
    public class LotResult: BaseResult
    {
        public LotModel LotInformation { get; set; }
        public LotResult(): base() { }
    }
}
