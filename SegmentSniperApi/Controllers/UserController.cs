using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile;
using SegmentSniper.ApplicationLogic.ActionHandlers.User;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IGetAppUserByAuthUSerIdActionHandler _getAppUserByAuthUSerIdActionHandler;
        private readonly IRevokeStravaTokenAsyncActionHandler _revokeStravaTokenAsyncActionHandler;

        public UserController(IGetAppUserByAuthUSerIdActionHandler getAppUserByAuthUSerIdActionHandler, IRevokeStravaTokenAsyncActionHandler revokeStravaTokenAsyncActionHandler)
        {
            _getAppUserByAuthUSerIdActionHandler = getAppUserByAuthUSerIdActionHandler;
            _revokeStravaTokenAsyncActionHandler = revokeStravaTokenAsyncActionHandler;
        }

        [HttpGet]
        [Authorize]
        [Route("me")]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                var userId = User.FindFirst("sub")?.Value;

                var user = await _getAppUserByAuthUSerIdActionHandler.HandleAsync(new GetAppUserByAuthIdRequest(userId));

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to get user profile. \n {ex.Message}");

            }
        }

        [HttpDelete]
        [Authorize]
        [Route("RevokeStravaToken")]
        public async Task<IActionResult> RevokeStravaToken()
        {
            try
            {
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
                var response = await _revokeStravaTokenAsyncActionHandler.HandleAsync(new RevokeStravaTokenAsyncActionHandlerRequest(userId));
                if (response.Success)
                {
                    return Ok(response);
                }
                else
                {
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to remove Strava token. \n {ex.Message}");
            }
        }

        //[HttpDelete]
        //[Authorize]
        //[Route("DeleteAccount")]
        //public async Task<IActionResult> DeleteAccount()
        //{
        //    try
        //    {
        //        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
        //        var response = await _deleteProfileActionHandler.HandleAsync(new DeleteProfileAsyncRequest(userId));
        //        if (response.Success)
        //        {
        //            return Ok(response);
        //        }
        //        else
        //        {
        //            return BadRequest(response);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(422, $"Unable to update password. \n {ex.Message}");
        //    }
        //}
    }
}
