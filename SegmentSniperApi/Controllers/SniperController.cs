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
        private readonly IGetSummaryActivityForTimeRangeActionHandler _getSummaryActivityForTimeRangeActionHandler;
        private readonly ISnipeSegmentsActionHandler _snipeSegmentsActionHandler;

        public SniperController(IGetSummaryActivityForTimeRangeActionHandler getSummaryActivityForTimeRangeActionHandler, ISnipeSegmentsActionHandler snipeSegmentsActionHandler)
        {
            _getSummaryActivityForTimeRangeActionHandler = getSummaryActivityForTimeRangeActionHandler;
            _snipeSegmentsActionHandler = snipeSegmentsActionHandler;
        }


        [HttpPost]
        [Authorize]
        [Route("getSummaryActivityByDateRange")]
        public IActionResult GetSummaryActivityForTimeRange([FromBody] GetSummaryActivityListForTimeRangeContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var  request = new GetSummaryActivityForTimeRangeRequest(userId, (DateTime)contract.StartDate, (DateTime)contract.EndDate, contract.ActivityType);

            var returnList = _getSummaryActivityForTimeRangeActionHandler.Handle(request).Result;

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, "Unable to fetch activities.");
        }


        //get summary activity by Id
        [HttpGet]
        [Authorize]
        [Route("getActivitySummaryById/$activityId")]
        public IActionResult GetSummaryActivityById(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            throw new NotImplementedException();
        }

        [HttpPost]
        [Authorize]
        public IActionResult SnipeSegments(SegmentSniperContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var request = new SnipeSegmentsRequest
            {
                UserId = userId,
                ActivityId = contract.ActivityId,
                SecondsFromKom = contract.SecondsFromKom,
                PercentageFromKom = contract.PercentageFromKom,
                UseQom = contract.UseQom,
            };

            var returnList = _snipeSegmentsActionHandler.Handle(request).Result;

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, "Unable to snipe segments.");
        }

        //get detailed activity by Id

        //get detailed segment by ID

        //star segment

    }
}
