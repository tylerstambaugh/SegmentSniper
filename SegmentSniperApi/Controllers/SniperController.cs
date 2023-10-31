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
        private readonly IGetSummaryActivityByIdActionHandler _getSummaryActivityByIdActionHandler;
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;
        private readonly ISnipeSegmentsActionHandler _snipeSegmentsActionHandler;

        public SniperController(IGetSummaryActivityForTimeRangeActionHandler getSummaryActivityForTimeRangeActionHandler, IGetSummaryActivityByIdActionHandler getSummaryActivityByIdActionHandler, IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler, ISnipeSegmentsActionHandler snipeSegmentsActionHandler)
        {
            _getSummaryActivityForTimeRangeActionHandler = getSummaryActivityForTimeRangeActionHandler;
            _getSummaryActivityByIdActionHandler = getSummaryActivityByIdActionHandler;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
            _snipeSegmentsActionHandler = snipeSegmentsActionHandler;
        }


        [HttpPost]
        [Authorize]
        [Route("getSummaryActivityByDateRange")]
        public IActionResult GetSummaryActivityForTimeRange([FromBody] GetSummaryActivityListForTimeRangeContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var request = new GetSummaryActivityForTimeRangeRequest(userId, (DateTime)contract.StartDate, (DateTime)contract.EndDate, contract.ActivityType);

            var returnList = _getSummaryActivityForTimeRangeActionHandler.Handle(request).Result;

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, "Unable to fetch activities.");
        }

        [HttpGet]
        [Authorize]
        [Route("getActivitySummaryById/$activityId")]
        public IActionResult GetSummaryActivityById(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var request = new GetSummaryActivityByIdRequest(userId, activityId);
            var returnList = _getSummaryActivityByIdActionHandler.Handle(request).Result;

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, $"Unable to fetch activity Id: {activityId}.");
        }


        [HttpGet]
        [Authorize]
        [Route("getDetailedActivityById/$activityId")]
        public IActionResult GetDetailedActivityById(string activityId)
        {

            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var request = new GetDetailedActivityByIdRequest(userId, activityId);
            var returnList = _getDetailedActivityByIdActionHandler.Handle(request).Result;

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, $"Unable to fetch activity Id: {activityId}.");
        }

        [HttpGet]
        [Authorize]
        [Route("summarySegment/$activityId")]
        public IActionResult SummarySegment(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            throw new NotImplementedException();
        }

        [HttpPost]
        [Authorize]
        [Route("snipeSegments")]
        public IActionResult SnipeSegments([FromBody] SegmentSniperContract contract)
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


        //get detailed segment by ID

        //star segment

    }
}
