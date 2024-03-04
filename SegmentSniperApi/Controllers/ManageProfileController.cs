using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class ManageProfileController : ControllerBase
    {
        private readonly IGetProfileActionHandler _getProfileActionHandler;

        public ManageProfileController(IGetProfileActionHandler getProfileActionHandler)
        {
            _getProfileActionHandler = getProfileActionHandler;
        }

        public async Task<IActionResult> GetProfile()
        {
            try
            {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();            
            var userProfile = await _getProfileActionHandler.HandleAsync(new GetProfileRequest { UserId = userId});
                if (userProfile != null)
                    return Ok(userProfile);
                else
                    return StatusCode(421, $"Unable to fetch user profile.");

            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to fetch profile. \n {ex.Message}");
            }
        }

        public async Task<IActionResult> UpdatePassword()
        {
            return Ok();
        }

        public async Task<IActionResult> UpdateEmail()
        {
            return Ok();
        }

        public async Task<IActionResult> DeleteAccount()
        {
            return Ok();
        }
    }
}
