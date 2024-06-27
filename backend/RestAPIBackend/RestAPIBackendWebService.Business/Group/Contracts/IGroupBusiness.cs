using RestAPIBackendWebService.Domain.Common.Models;
using RestAPIBackendWebService.Domain.Group.DTOs;
using RestAPIBackendWebService.Domain.Group.Models;

namespace RestAPIBackendWebService.Business.Group.Contracts
{
    public interface IGroupBusiness
    {
        public Task<GroupResult> CreateGroupAsync(GroupCreateDTO group);
        public Task<GroupResult> GetGroupByIdAsync(int id);
        public Task<List<GroupResult>> GetAllGroupsAsync();
        public  Task<GroupResult> UpdateGroupAsync(int id, GroupUpdateDTO group);
        public Task<BaseResult> DeleteGroupAsync(int id);

    }
}
