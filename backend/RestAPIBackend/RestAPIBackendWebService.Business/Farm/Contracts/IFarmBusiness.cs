using RestAPIBackendWebService.Domain.Common.Models;
using RestAPIBackendWebService.Domain.Farm.DTOs;
using RestAPIBackendWebService.Domain.Farm.Models;

namespace RestAPIBackendWebService.Business.Farm.Contracts
{
    public interface IFarmBusiness
    {
        public Task<FarmResult> CreateFarmAsync(FarmCreateDTO farm);
        public Task<FarmResult> GetFarmByIdAsync(int id);
        public Task<List<FarmResult>> GetAllFarmsAsync();
        public Task<FarmResult> UpdateFarmAsync(int Id, FarmUpdateDTO farm);
        public Task<BaseResult> DeleteFarmAsync(int id);
    }
}
