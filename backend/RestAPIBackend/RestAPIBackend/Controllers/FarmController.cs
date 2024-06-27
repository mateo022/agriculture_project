using Asp.Versioning;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using RestAPIBackendWebService.Business.Farm.Contracts;
using RestAPIBackendWebService.Domain.Common.DTOs;
using RestAPIBackendWebService.Domain.Farm.DTOs;
using RestAPIBackendWebService.Domain.Farm.Models;
using System.Net;

namespace RestAPIBackend.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/farm")]
    public class FarmController : ControllerBase
    {
        public readonly IFarmBusiness _farmBusiness;

        public FarmController(IFarmBusiness farmBusiness)
        {
            _farmBusiness = farmBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDTO>> GetAllFarms()
        {
            var farmResults = await _farmBusiness.GetAllFarmsAsync();

            if (farmResults != null && farmResults.Any())
            {
                var farms = farmResults.Select(farmResult => farmResult.FarmInformation).ToList();

                return Ok(new ResponseDTO
                {
                    Data = farms,
                    Message = "Success",
                    StatusCode = (int)HttpStatusCode.OK
                });
            }

            return NotFound(new ErrorResponseDTO<Dictionary<string, List<string>>>
            {
                Message = "Failed",
                StatusCode = (int)HttpStatusCode.NotFound,
                Errors = new Dictionary<string, List<string>>
        {
            { "Farms", new List<string> { "No se encontraron fincas." } }
        }
            });
        }


        [HttpPost]
        public async Task<ActionResult<ResponseDTO>> CreateFarm(FarmCreateDTO farmCreateDTO)
        {
            var result = await _farmBusiness.CreateFarmAsync(farmCreateDTO);

            if (result.Success)
            {
                return Ok(new ResponseDTO
                {
                    Message = "Success",
                    StatusCode = (int)HttpStatusCode.OK
                });
            }


            return BadRequest(new ErrorResponseDTO<Dictionary<string, List<string>>>
            {
                Message = "Failed",
                StatusCode = (int)HttpStatusCode.Unauthorized,
                Errors = result.ErrorsList.Collection
            });
        }


        [HttpPut()]
        public async Task<ActionResult<ResponseDTO>> UpdateFarm(int id, FarmUpdateDTO farmUpdateDTO)
        {
            var result = await _farmBusiness.UpdateFarmAsync(id, farmUpdateDTO);

            if (result.Success)
            {
                return Ok(new ResponseDTO
                {
                    Data = result,
                    Message = "Success",
                    StatusCode = (int)HttpStatusCode.OK
                });
            }


            return BadRequest(new ErrorResponseDTO<Dictionary<string, List<string>>>
            {
                Message = "Failed",
                StatusCode = (int)HttpStatusCode.Unauthorized,
                Errors = result.ErrorsList.Collection
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDTO>> GetFarmById(int id)
        {
            var result = await _farmBusiness.GetFarmByIdAsync(id);

            if (result.Success)
            {
                return Ok(new ResponseDTO
                {
                    Data = result,
                    Message = "Success",
                    StatusCode = (int)HttpStatusCode.OK
                });
            }

            return NotFound(new ErrorResponseDTO<Dictionary<string, List<string>>>
            {
                Message = "Failed",
                StatusCode = (int)HttpStatusCode.NotFound,
                Errors = result.ErrorsList.Collection
            });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseDTO>> DeleteFarm(int id)
        {
            var result = await _farmBusiness.DeleteFarmAsync(id);

            if (result.Success)
            {
                return Ok(new ResponseDTO
                {
                    Data = result,
                    Message = "Success",
                    StatusCode = (int)HttpStatusCode.OK
                });
            }

            return BadRequest(new ErrorResponseDTO<Dictionary<string, List<string>>>
            {
                Message = "Failed",
                StatusCode = (int)HttpStatusCode.BadRequest,
                Errors = result.ErrorsList.Collection
            });
        }
    }
}
