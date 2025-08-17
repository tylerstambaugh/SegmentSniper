using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IRevokeStravaTokenAsyncActionHandler _revokeStravaTokenAsyncActionHandler;

        public ProfileController(
            IRevokeStravaTokenAsyncActionHandler revokeStravaTokenAsyncActionHandler)
        {
            _revokeStravaTokenAsyncActionHandler = revokeStravaTokenAsyncActionHandler;            
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
                return StatusCode(422, $"Unable to update password. \n {ex.Message}");
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
