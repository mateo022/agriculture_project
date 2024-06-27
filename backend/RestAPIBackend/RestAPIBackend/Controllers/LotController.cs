using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using RestAPIBackendWebService.Business.Farm.Contracts;
using RestAPIBackendWebService.Business.Lot.Contracts;
using RestAPIBackendWebService.Domain.Common.DTOs;
using RestAPIBackendWebService.Domain.Farm.DTOs;
using RestAPIBackendWebService.Domain.Lot.DTOs;
using System.Net;

namespace RestAPIBackend.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/lot")]
    public class LotController : ControllerBase
    {
        public readonly ILotBusiness _lotBusiness;

        public LotController(ILotBusiness lotBusiness)
        {
            _lotBusiness = lotBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDTO>> GetAllLots()
        {
            var lotResults = await _lotBusiness.GetAllLotsAsync();

            if (lotResults != null && lotResults.Any())
            {
                var lots = lotResults.Select(lotResult => lotResult.LotInformation).ToList();

                return Ok(new ResponseDTO
                {
                    Data = lots,
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
                    { "Lots", new List<string> { "No se encontraron lotes." } }
                }
            });
        }

        [HttpPost]
        public async Task<ActionResult<ResponseDTO>> CreateLot(LotCreateDTO lotCreateDTO)
        {
            var result = await _lotBusiness.CreateLotAsync(lotCreateDTO);

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

        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseDTO>> UpdateLot(int id, LotUpdateDTO lotUpdateDTO)
        {
            var result = await _lotBusiness.UpdateLotAsync(id, lotUpdateDTO);

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

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDTO>> GetLotById(int id)
        {
            var result = await _lotBusiness.GetLotByIdAsync(id);

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
        public async Task<ActionResult<ResponseDTO>> DeleteLot(int id)
        {
            var result = await _lotBusiness.DeleteLotAsync(id);

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