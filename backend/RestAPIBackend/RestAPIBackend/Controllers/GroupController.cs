using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using RestAPIBackendWebService.Business.Group.Contracts;
using RestAPIBackendWebService.Business.Lot.Contracts;
using RestAPIBackendWebService.Domain.Common.DTOs;
using RestAPIBackendWebService.Domain.Group.DTOs;
using RestAPIBackendWebService.Domain.Lot.DTOs;
using System.Net;

namespace RestAPIBackend.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/group")]
    public class GroupController: ControllerBase
    {
        public readonly IGroupBusiness _groupBusiness;

        public GroupController(IGroupBusiness groupBusiness)
        {
            _groupBusiness = groupBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDTO>> GetAllGroups()
        {
            var groupResults = await _groupBusiness.GetAllGroupsAsync();

            if (groupResults != null && groupResults.Any())
            {
                var groups = groupResults.Select(groupResult => groupResult.GroupInformation).ToList();

                return Ok(new ResponseDTO
                {
                    Data = groups,
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
                    { "Groups", new List<string> { "No se encontraron grupos." } }
                }
            });
        }

        [HttpPost]
        public async Task<ActionResult<ResponseDTO>> CreateGroup(GroupCreateDTO groupCreateDTO)
        {
            var result = await _groupBusiness.CreateGroupAsync(groupCreateDTO);

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
        public async Task<ActionResult<ResponseDTO>> UpdateGroup(int id, GroupUpdateDTO groupUpdateDTO)
        {
            var result = await _groupBusiness.UpdateGroupAsync(id,groupUpdateDTO);

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
        public async Task<ActionResult<ResponseDTO>> GetGroupById(int id)
        {
            var result = await _groupBusiness.GetGroupByIdAsync(id);

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
        public async Task<ActionResult<ResponseDTO>> DeleteGroup(int id)
        {
            var result = await _groupBusiness.DeleteGroupAsync(id);

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
