using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAddStravaAthlete _addStravaAthlete;

        // private readonly IRemoveUserActionHandler _removeUserActionHandler;
        // private readonly IGetUsersActionHandler _getUsersActionHandler;

        public AdminController(IAddStravaAthlete addStravaAthlete)
        {
            _addStravaAthlete = addStravaAthlete;
        }


        [HttpPost]
        [Route("add-strava-athlete")]
        public async Task<IActionResult> AddStravaAthlete(AddStravaAthleteRequest request)
        {
            try
            {
                var response = await _addStravaAthlete.ExecuteAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}"));
            }
        }
        //[HttpGet]
        //[Route("get-users")]
        //public async Task<IActionResult> GetUsers()
        //{
        //    try
        //    {
        //        var response = await _getUsersActionHandler.HandleAsync();

        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}"));
        //    }
        //}

        //[HttpPost]
        //[Route("remove-user")]
        //public async Task<IActionResult> RemoveUser(RemoveUserRequest request)
        //{
        //    try
        //    {
        //        var response = await _removeUserActionHandler.HandleAsync(request);

        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}"));
        //    }
        //}
    }

}
