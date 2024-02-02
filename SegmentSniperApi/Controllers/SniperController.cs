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
        private readonly IGetActivityListForTimeRangeActionHandler _getActivityListForTimeRangeActionHandler;
        private readonly IGetActivityListByIdActionHandler _getActivityListByIdActionHandler;
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;
        private readonly ISnipeSegmentsActionHandler _snipeSegmentsActionHandler;
        private readonly IGetDetailedSegmentBySegmentIdActionHandler _getDetailedSegmentBySegmentIdActionHandler;
        private readonly IStarSegmentActionHandler _starSegmentActionHandler;
        private readonly IGetSnipeSegmentsByActivityIdActionHandler _getSnipeSegmentsByActivityIdActionHandler;
        private readonly IGetActivityListByNameActionHandler _getActivityListByNameActionHandler;
        private readonly IGetActivityListActionHandler _getActivityListActionHandler;

        public SniperController(IGetActivityListForTimeRangeActionHandler getActivityListForTimeRangeActionHandler, IGetActivityListByIdActionHandler getActivityListByIdActionHandler, IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler, ISnipeSegmentsActionHandler snipeSegmentsActionHandler, IGetDetailedSegmentBySegmentIdActionHandler getDetailedSegmentBySegmentIdActionHandler, IStarSegmentActionHandler starSegmentActionHandler, IGetSnipeSegmentsByActivityIdActionHandler getSnipeSegmentsByActivityIdActionHandler, IGetActivityListByNameActionHandler getActivityListByNameActionHandler, IGetActivityListActionHandler getActivityListActionHandler)
        {
            _getActivityListForTimeRangeActionHandler = getActivityListForTimeRangeActionHandler;
            _getActivityListByIdActionHandler = getActivityListByIdActionHandler;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
            _snipeSegmentsActionHandler = snipeSegmentsActionHandler;
            _getDetailedSegmentBySegmentIdActionHandler = getDetailedSegmentBySegmentIdActionHandler;
            _starSegmentActionHandler = starSegmentActionHandler;
            _getSnipeSegmentsByActivityIdActionHandler = getSnipeSegmentsByActivityIdActionHandler;
            _getActivityListByNameActionHandler = getActivityListByNameActionHandler;
            _getActivityListActionHandler = getActivityListActionHandler;
        }


        [HttpPost]
        [Authorize]
        [Route("getActivityListForDateRange")]
        public async Task<IActionResult> GetActivityListForTimeRange([FromBody] GetActivityListForTimeRangeContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var request = new GetActivityListForTimeRangeRequest(userId, (DateTime)contract.StartDate, (DateTime)contract.EndDate, contract.ActivityType);

            var returnList = await _getActivityListForTimeRangeActionHandler.Handle(request);

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, "Unable to fetch activities.");
        }

        [HttpGet]
        [Authorize]
        [Route("getActivityListById/$activityId")]
        public async Task<IActionResult> GetActivityListById(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var request = new GetActivityListByIdRequest(userId, activityId);
            var returnList = await _getActivityListByIdActionHandler.HandleAsync(request);

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, $"Unable to fetch activity Id: {activityId}.");
        }

        [HttpPost]
        [Authorize]
        [Route("getActivityListByName")]
        public async Task<IActionResult> GetActivityListByName([FromBody] GetActivityListByNameRequest request)
        {
            try
            {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var handlerRequest = new GetActivityListByNameRequest(userId, request.ActivityName, request.ActivityType);
            var returnList = await _getActivityListByNameActionHandler.HandleAsync(handlerRequest);

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, $"Unable to fetch activity by name: {request.ActivityName}.");
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to fetch activity by name: \"{request.ActivityName}\" \n {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("getActivityList")]
        public async Task<IActionResult> GetActivityList([FromBody] GetActivityListRequest request)
        {
            try
            {
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
                request.UserId = userId;
                var returnList = await _getActivityListActionHandler.HandleAsync(request);

                if (returnList != null)
                    return Ok(returnList);
                else
                    return StatusCode(421, $"Unable to fetch activity list.");
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to fetch activities. Error: \n {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("getDetailedActivityById/$activityId")]
        public async Task<IActionResult> GetDetailedActivityById(string activityId)
        {

            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var request = new GetDetailedActivityByIdRequest(userId, activityId);
            var returnList = await _getDetailedActivityByIdActionHandler.Handle(request);

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, $"Unable to fetch activity Id: {activityId}.");
        }


        [HttpPost]
        [Authorize]
        [Route("snipeSegments")]
        public async Task<IActionResult> SnipeSegments([FromBody] SegmentSniperContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var request = new SnipeSegmentsRequest
            {
                UserId = userId,
                ActivityId = contract.ActivityId,
                SecondsFromKom = contract.SecondsOff,
                PercentageFromKom = contract.PercentageOff,
                UseQom = contract.UseQom,
            };

            var returnList = await _snipeSegmentsActionHandler.Handle(request);

            if (returnList != null)
                return Ok(returnList);
            else
                return StatusCode(421, "Unable to snipe segments.");
        }


        [HttpPost]
        [Authorize]
        [Route("starSegment/{segmentId}")]
        public async Task<IActionResult> StarSegment(string segmentId, [FromBody] StarSegmentContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var request = new StarSegmentRequest
            {
                UserId = userId,
                SegmentId = segmentId,
                Star = contract.Star,
            };

            var returnSegment = await _starSegmentActionHandler.HandleAsync(request);
            if (returnSegment != null) return Ok(returnSegment);
            else return StatusCode(421, "Unable to star segment");
        }


        [HttpGet]
        [Authorize]
        [Route("detailedSegment/{segmentId}")]
        public async Task<IActionResult> DetailedSegment(string segmentId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var request = new GetDetailedSegmentBySegmentIdRequest
            {
                UserId = userId,
                SegmentId = segmentId,
            };

            var returnSegment = await _getDetailedSegmentBySegmentIdActionHandler.HandleAsync(request);
            if (returnSegment != null) return Ok(returnSegment);
            else return StatusCode(421, "Unable to star segment");
        }

        [HttpGet]
        [Authorize]
        [Route("snipeSegments/{activityId}")]
        public async Task<IActionResult> SnipeSegments(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            var request = new GetSnipeSegmentsByActivityIdRequest
            {
                UserId = userId,
                ActivityId = activityId,
            };

            var result = await _getSnipeSegmentsByActivityIdActionHandler.HandleAsync(request);
            if (result.StatusCode == 200) return Ok(result.Data);
            else return StatusCode(result.StatusCode, result.ErrorMessage);
        }
    }
}
