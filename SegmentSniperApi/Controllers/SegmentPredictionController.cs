using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers;
using SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SegmentPredictionController : ControllerBase
    {
        private readonly ISegmentPredictionActionHandler _segmentPredictionActionHandler;

        public SegmentPredictionController(ISegmentPredictionActionHandler segmentPredictionActionHandler)
        {
            _segmentPredictionActionHandler = segmentPredictionActionHandler;
        }

        [HttpPost]
        [Authorize]
        [Route("PredictSegment")]
        public async Task<IActionResult> PredictSegment([FromBody] SegmentPredictionRequest request)
        {
            try
            {
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
                var response = await _segmentPredictionActionHandler.HandleAsync(new SegmentPredictionRequest(request.SegmentId, userId));

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable topredict segment. \n {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        [Route("TrainModel")]
        public async Task<IActionResult> TrainModel([FromBody] TrainModelRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
