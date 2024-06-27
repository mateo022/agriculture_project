using RestAPIBackendWebService.Domain.Common.Models;
using RestAPIBackendWebService.Domain.Lot.DTOs;
using RestAPIBackendWebService.Domain.Lot.Models;

namespace RestAPIBackendWebService.Business.Lot.Contracts
{
    public interface ILotBusiness
    {
        public Task<LotResult> CreateLotAsync(LotCreateDTO lot);
        public Task<LotResult> GetLotByIdAsync(int id);
        public Task<List<LotResult>> GetAllLotsAsync();
        public Task<LotResult> UpdateLotAsync(int Id, LotUpdateDTO lot);
        public Task<BaseResult> DeleteLotAsync(int id);
    }
}
