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
        private readonly IGetAppUserByAuthUserIdActionHandler _getAppUserByAuthUserIdActionHandler;
        private readonly IRevokeStravaTokenAsyncActionHandler _revokeStravaTokenAsyncActionHandler;

        public UserController(IGetAppUserByAuthUserIdActionHandler getAppUserByAuthUserIdActionHandler, IRevokeStravaTokenAsyncActionHandler revokeStravaTokenAsyncActionHandler)
        {
            _getAppUserByAuthUserIdActionHandler = getAppUserByAuthUserIdActionHandler;
            _revokeStravaTokenAsyncActionHandler = revokeStravaTokenAsyncActionHandler;
        }

        [HttpGet]
        [Authorize]
        [Route("me")]
        public async Task<IActionResult> GetMe()
        {
            try
            {                
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return StatusCode(499, $"User ID not found in token.");
                }

                var user = await _getAppUserByAuthUserIdActionHandler.HandleAsync(new GetAppUserByAuthIdRequest(userId));

                if (user.AppUserModel == null)
                    return StatusCode(499, $"Unable to get user information. User ID ${userId}");

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to get user information. \n {ex.Message}");

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
