using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.SniperActionHandlers;
using SegmentSniper.Api.Controllers.Contracts;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{
    [Authorize]
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SniperController : ControllerBase
    {
        private readonly IGetSummaryActivityActionHandler _getSummaryActivityForTimeRangeActionHandler;

        public SniperController(IGetSummaryActivityActionHandler getSummaryActivityForTimeRangeActionHandler)
        {
            _getSummaryActivityForTimeRangeActionHandler = getSummaryActivityForTimeRangeActionHandler;
        }


        [HttpPost]
        [Authorize]
        [Route("getSummaryActivityForTimeRange")]
        public IActionResult GetSummaryActivityForTimeRange([FromBody] GetSummaryActivityListForTimeRangeContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var  request = new GetSummaryActivityForTimeRangeRequest(userId, contract.ActivityId, (DateTime)contract.StartDate, (DateTime)contract.EndDate, contract.ActivityType);

            var returnList = _getSummaryActivityForTimeRangeActionHandler.Handle(request);

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, "Unable to fetch activities.");
        }


        //get detailed activity by Id
        [HttpPost]
        [Authorize]
        [Route("getActivityListById/$activityId")]
        public IActionResult GetActivityListById(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
        }

        //get detailed segment by ID

        //star segment

    }
}
