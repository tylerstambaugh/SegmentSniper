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
        private readonly IUpdateFirstNameAsyncActionHandler _updateUserFirstNameActionHandler;
        private readonly IUpdateEmailAddressAsyncActionHandler _updateEmailAddressAsyncActionHandler;
        private readonly IRequestChangeEmailVerificationCodeAsyncActionHandler _requestChangeEmailVerificationCodeAsyncActionHandler;

        public ProfileController(IGetProfileActionHandler getProfileActionHandler, IUpdateFirstNameAsyncActionHandler updateUserFirstNameActionHandler, IUpdateEmailAddressAsyncActionHandler updateEmailAddressAsyncActionHandler, IRequestChangeEmailVerificationCodeAsyncActionHandler requestChangeEmailVerificationCodeAsyncActionHandler)
        {
            _getProfileActionHandler = getProfileActionHandler;
            _updateUserFirstNameActionHandler = updateUserFirstNameActionHandler;
            _updateEmailAddressAsyncActionHandler = updateEmailAddressAsyncActionHandler;
            _requestChangeEmailVerificationCodeAsyncActionHandler = requestChangeEmailVerificationCodeAsyncActionHandler;
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
        public async Task<IActionResult> UpdateUserFirstName([FromBody] UpdateFirstNameRequest request)
        {
            try
              {
              var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
              var response = await _updateUserFirstNameActionHandler.HandleAsync(new UpdateFirstNameRequest 
                {
                    UserId = userId,
                    FirstName = request.FirstName 
                });
                
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to update first name. \n {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("SendChangeEmailVerificationCode")]
        public async Task<IActionResult>SendChangeEmailVerificationCode([FromBody] SendChangeEmailVerificationCodeRequest request)
        {
            try
            {
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();               
                var response = _requestChangeEmailVerificationCodeAsyncActionHandler.HandleAsync(new RequestChangeEmailVerificationCodeActionHandlerRequest(userId, request.EmailAddress));
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to send verification code. \n {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateEmailAddress")]
        public async Task<IActionResult> UpdateEmailAddress([FromBody] UpdateEmailAddressAsyncRequest request)
        {
            try
            {
                request.UserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
                var response = await _updateEmailAddressAsyncActionHandler.HandleAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to update email address. \n {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateEmailAddress")]
        public async Task<IActionResult> UpdatePassword([FromBody] string password)
        {
            try
            {
               var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
                
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to update password. \n {ex.Message}");
            }
        }



        //public async Task<IActionResult> DeleteAccount()
        //{
        //    return Ok();
        //}
    }
}
