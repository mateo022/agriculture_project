using Microsoft.EntityFrameworkCore;
using RestAPIBackendWebService.Business.Group.Contracts;
using RestAPIBackendWebService.Domain.Common.Models;
using RestAPIBackendWebService.Domain.Group.DTOs;
using RestAPIBackendWebService.Domain.Group.Models;
using RestAPIBackendWebService.Domain.Lot.Entities;

namespace RestAPIBackendWebService.Business.Group.Logic
{
    public class GroupBusiness: IGroupBusiness
    {
        private readonly RestAPIDbContext _context;

        public GroupBusiness(RestAPIDbContext context)
        {
            _context = context;
        }

        public async Task<GroupResult> CreateGroupAsync(GroupCreateDTO group)
        {
            var result = new GroupResult { Success = true };

            if (string.IsNullOrEmpty(group.Name))
            {
                result.ErrorsList.AddErrorForKey("Campos", "El nombre del grupo es requerido.");
                result.Success = false;
                return result;
            }

            var lotEntity = await _context.Lots.FindAsync(group.LotId);
            if (lotEntity == null)
            {
                result.ErrorsList.AddErrorForKey("LotId", $"No se encontró el lote con ID {group.LotId}.");
                result.Success = false;
                return result;
            }

            var groupEntity = new GroupEntity
            {
                LotId = group.LotId,
                Name = group.Name
            };

            _context.Groups.Add(groupEntity);
            await _context.SaveChangesAsync();

            result.GroupInformation = new GroupModel
            {
                Id = groupEntity.Id,
                LotId = groupEntity.LotId,
                Name = groupEntity.Name
            };

            return result;
        }

        public async Task<GroupResult> GetGroupByIdAsync(int id)
        {
            var result = new GroupResult { Success = true };

            var groupEntity = await _context.Groups.FindAsync(id);
            if (groupEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró el grupo con ID {id}.");
                result.Success = false;
                return result;
            }

            result.GroupInformation = new GroupModel
            {
                Id = groupEntity.Id,
                LotId = groupEntity.LotId,
                Name = groupEntity.Name
            };

            return result;
        }

        public async Task<List<GroupResult>> GetAllGroupsAsync()
        {
            var result = new List<GroupResult>();

            var groups = await _context.Groups.ToListAsync();
            foreach (var groupEntity in groups)
            {
                var groupResult = new GroupResult
                {
                    Success = true,
                    GroupInformation = new GroupModel
                    {
                        Id = groupEntity.Id,
                        LotId = groupEntity.LotId,
                        Name = groupEntity.Name
                    }
                };
                result.Add(groupResult);
            }

            return result;
        }

        public async Task<GroupResult> UpdateGroupAsync(int id, GroupUpdateDTO group)
        {
            var result = new GroupResult { Success = true };

            var groupEntity = await _context.Groups.FindAsync(id);
            if (groupEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró el grupo con ID {id}.");
                result.Success = false;
                return result;
            }

            if (string.IsNullOrEmpty(group.Name))
            {
                result.ErrorsList.AddErrorForKey("Campos", "El nombre del grupo es requerido.");
                result.Success = false;
                return result;
            }

            var lotEntity = await _context.Lots.FindAsync(group.LotId);
            if (lotEntity == null)
            {
                result.ErrorsList.AddErrorForKey("LotId", $"No se encontró el lote con ID {group.LotId}.");
                result.Success = false;
                return result;
            }

            groupEntity.LotId = group.LotId;
            groupEntity.Name = group.Name;

            _context.Entry(groupEntity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            result.GroupInformation = new GroupModel
            {
                Id = groupEntity.Id,
                LotId = groupEntity.LotId,
                Name = groupEntity.Name
            };

            return result;
        }

        public async Task<BaseResult> DeleteGroupAsync(int id)
        {
            var result = new BaseResult { Success = true };

            var groupEntity = await _context.Groups.FindAsync(id);
            if (groupEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró el grupo con ID {id}.");
                result.Success = false;
                return result;
            }

            _context.Groups.Remove(groupEntity);
            await _context.SaveChangesAsync();

            return result;
        }
    }
}
