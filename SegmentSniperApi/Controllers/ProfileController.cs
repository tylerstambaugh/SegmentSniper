using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IGetProfileActionHandler _getProfileActionHandler;
        private readonly IUpdateUserFirstNameAsyncActionHandler _updateUserFirstNameActionHandler;

        public ProfileController(IGetProfileActionHandler getProfileActionHandler, IUpdateUserFirstNameAsyncActionHandler updateUserFirstNameActionHandler)
        {
            _getProfileActionHandler = getProfileActionHandler;
            _updateUserFirstNameActionHandler = updateUserFirstNameActionHandler;
        }

        [HttpGet]
        [Authorize]       
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

        [HttpPatch]
        [Authorize]
        [Route("UpdateUserFirstName")]
        public async Task<IActionResult> UpdatUserFirstName([FromBody] UpdateUserFirstNameRequest request)
        {
            try
            {
              var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
              var result = await _updateUserFirstNameActionHandler.HandleAsync(new UpdateUserFirstNameRequest 
                {
                    UserId = userId,
                    FirstName = request.FirstName 
                });
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to update first name. \n {ex.Message}");
            }
        }

        //public async Task<IActionResult> UpdatePassword()
        //{
        //    return Ok();
        //}

        //public async Task<IActionResult> UpdateEmail()
        //{
        //    return Ok();
        //}

        //public async Task<IActionResult> DeleteAccount()
        //{
        //    return Ok();
        //}
    }
}
