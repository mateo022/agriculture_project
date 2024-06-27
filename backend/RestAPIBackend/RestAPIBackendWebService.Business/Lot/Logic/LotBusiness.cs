using Microsoft.EntityFrameworkCore;
using RestAPIBackendWebService.Business.Lot.Contracts;
using RestAPIBackendWebService.Domain.Common.Models;
using RestAPIBackendWebService.Domain.Farm.Models;
using RestAPIBackendWebService.Domain.Group.Models;
using RestAPIBackendWebService.Domain.Lot.DTOs;
using RestAPIBackendWebService.Domain.Lot.Entities;
using RestAPIBackendWebService.Domain.Lot.Models;

namespace RestAPIBackendWebService.Business.Lot.Logic
{
    public class LotBusiness : ILotBusiness
    {
        private readonly RestAPIDbContext _context;

        public LotBusiness(RestAPIDbContext context)
        {
            _context = context;
        }

        public async Task<LotResult> CreateLotAsync(LotCreateDTO lot)
        {
            var result = new LotResult { Success = true };

            if (string.IsNullOrEmpty(lot.Name) || lot.Trees <= 0)
            {
                result.ErrorsList.AddErrorForKey("Campos", "Nombre y número de árboles son requeridos.");
                result.Success = false;
                return result;
            }

            var farmEntity = await _context.Farms.FindAsync(lot.FarmId);
            if (farmEntity == null)
            {
                result.ErrorsList.AddErrorForKey("FarmId", $"No se encontró la finca con ID {lot.FarmId}.");
                result.Success = false;
                return result;
            }

            var lotEntity = new LotEntity
            {
                FarmId = lot.FarmId,
                Name = lot.Name,
                Trees = lot.Trees,
                Stage = lot.Stage
            };

            _context.Lots.Add(lotEntity);
            await _context.SaveChangesAsync();

            result.LotInformation = new LotModel
            {
                Id = lotEntity.Id,
                FarmId = lotEntity.FarmId,
                Name = lotEntity.Name,
                Trees = lotEntity.Trees,
                Stage = lotEntity.Stage,
                Groups = new List<GroupModel>() // Puedes inicializar grupos aquí si es necesario
            };

            return result;
        }


        public async Task<LotResult> UpdateLotAsync(int id, LotUpdateDTO lot)
        {
            var result = new LotResult { Success = true };

            var lotEntity = await _context.Lots.FindAsync(id);
            if (lotEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró el lote con ID {id}.");
                result.Success = false;
                return result;
            }

            var farmEntity = await _context.Farms.FindAsync(lot.FarmId);
            if (farmEntity == null)
            {
                result.ErrorsList.AddErrorForKey("FarmId", $"No se encontró la finca con ID {lot.FarmId}.");
                result.Success = false;
                return result;
            }

            if (string.IsNullOrEmpty(lot.Name) || lot.Trees <= 0)
            {
                result.ErrorsList.AddErrorForKey("Campos", "Nombre y número de árboles son requeridos.");
                result.Success = false;
                return result;
            }

            lotEntity.FarmId = lot.FarmId;
            lotEntity.Name = lot.Name;
            lotEntity.Trees = lot.Trees;
            lotEntity.Stage = lot.Stage;

            _context.Entry(lotEntity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            result.LotInformation = new LotModel
            {
                Id = lotEntity.Id,
                FarmId = lotEntity.FarmId,
                Name = lotEntity.Name,
                Trees = lotEntity.Trees,
                Stage = lotEntity.Stage,
                Groups = new List<GroupModel>() // Puedes inicializar grupos aquí si es necesario
            };

            return result;
        }

        public async Task<List<LotResult>> GetAllLotsAsync()
        {
            var result = new List<LotResult>();

            var lots = await _context.Lots
                .Include(lot => lot.Farm)  // Incluye la entidad Farm relacionada
                .Include(lot => lot.Groups)  // Incluye la colección de Groups relacionados
                .ToListAsync();

            foreach (var lotEntity in lots)
            {
                var lotResult = new LotResult
                {
                    Success = true,
                    LotInformation = new LotModel
                    {
                        Id = lotEntity.Id,
                        FarmId = lotEntity.FarmId,
                        Name = lotEntity.Name,
                        Trees = lotEntity.Trees,
                        Stage = lotEntity.Stage,
                        Groups = lotEntity.Groups.Select(group => new GroupModel
                        {
                            Id = group.Id,
                            LotId = group.LotId,
                            Name = group.Name
                            // Agrega más propiedades según sea necesario
                        }).ToList()
                    }
                };
                result.Add(lotResult);
            }

            return result;
        }

        public async Task<LotResult> GetLotByIdAsync(int id)
        {
            var result = new LotResult { Success = true };

            var lotEntity = await _context.Lots
                .Include(lot => lot.Farm)  // Incluye la entidad Farm relacionada
                .Include(lot => lot.Groups)  // Incluye la colección de Groups relacionados
                .FirstOrDefaultAsync(lot => lot.Id == id);

            if (lotEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró el lote con ID {id}.");
                result.Success = false;
                return result;
            }

            result.LotInformation = new LotModel
            {
                Id = lotEntity.Id,
                FarmId = lotEntity.FarmId,
                Name = lotEntity.Name,
                Trees = lotEntity.Trees,
                Stage = lotEntity.Stage,
                Groups = lotEntity.Groups.Select(group => new GroupModel
                {
                    Id = group.Id,
                    LotId = group.LotId,
                    Name = group.Name
                    // Agrega más propiedades según sea necesario
                }).ToList()
            };

            return result;
        }


        public async Task<BaseResult> DeleteLotAsync(int id)
        {
            var result = new BaseResult { Success = true };

            var lotEntity = await _context.Lots.FindAsync(id);
            if (lotEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró el lote con ID {id}.");
                result.Success = false;
                return result;
            }

            _context.Lots.Remove(lotEntity);
            await _context.SaveChangesAsync();

            return result;
        }

    }
}
