using Microsoft.EntityFrameworkCore;
using RestAPIBackendWebService.Business.Farm.Contracts;
using RestAPIBackendWebService.Domain.Common.Models;
using RestAPIBackendWebService.Domain.Farm.DTOs;
using RestAPIBackendWebService.Domain.Farm.Models;
using RestAPIBackendWebService.Domain.Lot.Entities;
using RestAPIBackendWebService.Domain.Lot.Models;

namespace RestAPIBackendWebService.Business.Farm.Logic
{

    public class FarmBusiness : IFarmBusiness
    {
        private readonly RestAPIDbContext _context;

        public FarmBusiness(RestAPIDbContext context)
        {
            _context = context;
        }

        //Funtion to get all Farms
        public async Task<List<FarmResult>> GetAllFarmsAsync()
        {
            var result = new List<FarmResult>();

            var farms = await _context.Farms
                .Include(farm => farm.Lots) // Incluir la relación de lotes
                .ToListAsync();

            foreach (var farmEntity in farms)
            {
                var farmResult = new FarmResult
                {
                    Success = true,
                    FarmInformation = new FarmModel
                    {
                        Id = farmEntity.Id,
                        Name = farmEntity.Name,
                        Location = farmEntity.Location,
                        Hectares = farmEntity.Hectares,
                        Description = farmEntity.Description,
                        Lots = farmEntity.Lots.Select(lot => new LotModel
                        {
                            Id = lot.Id,
                            FarmId = lot.FarmId,
                            Name = lot.Name,
                            Trees = lot.Trees,
                            Stage = lot.Stage
                            // Puedes agregar más propiedades según sea necesario
                        }).ToList()
                    }
                };
                result.Add(farmResult);
            }

            return result;
        }
        //Funtion to create new farm
        public async Task<FarmResult> CreateFarmAsync(FarmCreateDTO farm)
        {
            var result = new FarmResult { Success = true };

            if (string.IsNullOrEmpty(farm.Name) || farm.Hectares <= 0)
            {
                result.ErrorsList.AddErrorForKey("Campos", "Nombre y tamaño en hectáreas son requeridos.");
                result.Success = false;
                return result;
            }

            var farmEntity = new FarmEntity
            {
                Name = farm.Name,
                Location = farm.Location,
                Hectares = farm.Hectares,
                Description = farm.Description
            };

            _context.Farms.Add(farmEntity);
            await _context.SaveChangesAsync();

            result.FarmInformation = new FarmModel
            {
                Id = farmEntity.Id,
                Name = farmEntity.Name,
                Location = farmEntity.Location,
                Hectares = farmEntity.Hectares,
                Description = farmEntity.Description
            };

            return result;
        }
        //Funtion to get farm by ID
        public async Task<FarmResult> GetFarmByIdAsync(int id)
        {
            var result = new FarmResult { Success = true };

            var farmEntity = await _context.Farms
                .Include(farm => farm.Lots) // Incluye los lotes asociados a la finca
                .FirstOrDefaultAsync(farm => farm.Id == id);

            if (farmEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró la finca con ID {id}.");
                result.Success = false;
                return result;
            }

            result.FarmInformation = new FarmModel
            {
                Id = farmEntity.Id,
                Name = farmEntity.Name,
                Location = farmEntity.Location,
                Hectares = farmEntity.Hectares,
                Description = farmEntity.Description,
                Lots = farmEntity.Lots.Select(lot => new LotModel
                {
                    Id = lot.Id,
                    FarmId = lot.FarmId,
                    Name = lot.Name,
                    Trees = lot.Trees,
                    Stage = lot.Stage
                    // Puedes agregar más propiedades según sea necesario
                }).ToList()
            };

            return result;
        }

        //Funtion to update farms by Id
        public async Task<FarmResult> UpdateFarmAsync(int id, FarmUpdateDTO farm)
        {
            var result = new FarmResult { Success = true };

            var farmEntity = await _context.Farms.FindAsync(id);
            if (farmEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró la finca con ID {id}.");
                result.Success = false;
                return result;
            }

            if (string.IsNullOrEmpty(farm.Name) || farm.Hectares <= 0)
            {
                result.ErrorsList.AddErrorForKey("Campos", "Nombre y tamaño en hectáreas son requeridos.");
                result.Success = false;
                return result;
            }

            farmEntity.Name = farm.Name;
            farmEntity.Location = farm.Location;
            farmEntity.Hectares = farm.Hectares;
            farmEntity.Description = farm.Description;

            _context.Entry(farmEntity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            result.FarmInformation = new FarmModel
            {
                Id = farmEntity.Id,
                Name = farmEntity.Name,
                Location = farmEntity.Location,
                Hectares = farmEntity.Hectares,
                Description = farmEntity.Description
            };

            return result;
        }

        //Funtion to delete farm by ID
        public async Task<BaseResult> DeleteFarmAsync(int id)
        {
            var result = new BaseResult { Success = true };

            var farmEntity = await _context.Farms.FindAsync(id);
            if (farmEntity == null)
            {
                result.ErrorsList.AddErrorForKey("Id", $"No se encontró la finca con ID {id}.");
                result.Success = false;
                return result;
            }

            _context.Farms.Remove(farmEntity);
            await _context.SaveChangesAsync();

            return result;
        }
    }
}
