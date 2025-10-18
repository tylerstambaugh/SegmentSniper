using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.Controllers.Contracts;
using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{
    [Authorize]
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SniperController : ControllerBase
    {
 
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;
        private readonly ISnipeSegmentsActionHandler _snipeSegmentsActionHandler;
        private readonly IGetDetailedSegmentBySegmentIdActionHandler _getDetailedSegmentBySegmentIdActionHandler;
        private readonly IStarSegmentActionHandler _starSegmentActionHandler;
        private readonly IGetSnipeSegmentsByActivityIdActionHandler _getSnipeSegmentsByActivityIdActionHandler;
        private readonly IGetActivityListActionHandler _getActivityListActionHandler;

        public SniperController(IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler,
            ISnipeSegmentsActionHandler snipeSegmentsActionHandler,
            IGetDetailedSegmentBySegmentIdActionHandler getDetailedSegmentBySegmentIdActionHandler,
            IStarSegmentActionHandler starSegmentActionHandler,
            IGetSnipeSegmentsByActivityIdActionHandler getSnipeSegmentsByActivityIdActionHandler,
            IGetActivityListActionHandler getActivityListActionHandler)
        {
           
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
            _snipeSegmentsActionHandler = snipeSegmentsActionHandler;
            _getDetailedSegmentBySegmentIdActionHandler = getDetailedSegmentBySegmentIdActionHandler;
            _starSegmentActionHandler = starSegmentActionHandler;
            _getSnipeSegmentsByActivityIdActionHandler = getSnipeSegmentsByActivityIdActionHandler;
            _getActivityListActionHandler = getActivityListActionHandler;
        }

        [HttpPost]
        [Authorize]
        [Route("getActivityList")]
        public async Task<IActionResult> GetActivityList([FromBody] GetActivityListRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    throw new InvalidOperationException("User ID claim is missing.");
                }
                
                request.UserId = userId;
                var returnList = await _getActivityListActionHandler.HandleAsync(request);

                if (returnList != null)
                    return Ok(returnList);
                else
                    return StatusCode(421, $"Unable to fetch activity list.");
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to fetch activities. \n {ex.Message}");
            }
        }

        //TODO DELETE THIS IF UNUSED
        //[HttpGet]
        //[Authorize]
        //[Route("getDetailedActivityById/$activityId")]
        //public async Task<IActionResult> GetDetailedActivityById(string activityId)
        //{

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        throw new InvalidOperationException("User ID claim is missing.");
        //    }

        //    var request = new GetDetailedActivityByIdRequest(userId, activityId);
        //    var returnList = await _getDetailedActivityByIdActionHandler.HandleAsync(request);

        //    if (returnList != null)
        //        return Ok(returnList);
        //    else
        //        return StatusCode(421, $"Unable to fetch activity Id: {activityId}.");
        //}

        [HttpPost]
        [Authorize]
        [Route("starSegment/{segmentId}")]
        public async Task<IActionResult> StarSegment(string segmentId, [FromBody] StarSegmentContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new InvalidOperationException("User ID claim is missing.");

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

        //TODO DELETE THIS IF UNUSED
        //[HttpGet]
        //[Authorize]
        //[Route("detailedSegment/{segmentId}")]
        //public async Task<IActionResult> DetailedSegment(string segmentId)
        //{
        //    var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
        //        ?? throw new InvalidOperationException("User ID claim is missing.");

        //    var request = new GetDetailedSegmentBySegmentIdRequest
        //    {
        //        UserId = userId,
        //        SegmentId = segmentId,
        //    };

        //    var returnSegment = await _getDetailedSegmentBySegmentIdActionHandler.HandleAsync(request);
        //    if (returnSegment != null) return Ok(returnSegment);
        //    else return StatusCode(421, "Unable to star segment");
        //}

        [HttpGet]
        [Authorize]
        [Route("snipeSegments/{activityId}")]
        public async Task<IActionResult> SnipeSegments(string activityId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new InvalidOperationException("User ID claim is missing.");

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
