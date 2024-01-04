using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.AdminActionHandlers;
using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IRemoveUserActionHandler _removeUserActionHandler;
        private readonly IGetUsersActionHandler _getUsersActionHandler;

        public AdminController(IRemoveUserActionHandler removeUserActionHandler, IGetUsersActionHandler getUsersActionHandler)
        {
            _removeUserActionHandler = removeUserActionHandler;
            _getUsersActionHandler = getUsersActionHandler;
        }

        [HttpGet]
        [Route("get-users")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var response = await _getUsersActionHandler.HandleAsync();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}"));
            }
        }

        [HttpPost]
        [Route("remove-user")]
        public async Task<IActionResult> RemoveUser(RemoveUserRequest request)
        {
            try
            {
                var response = await _removeUserActionHandler.HandleAsync(request);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}"));
            }
        }
    }

}
