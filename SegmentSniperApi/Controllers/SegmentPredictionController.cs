using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.SegmentPrediction;
using System.Security.Claims;

namespace SegmentSniper.Api.Controllers
{
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SegmentPredictionController : ControllerBase
    {
        private readonly ISegmentPredictionActionHandler _segmentPredictionActionHandler;
        private readonly IGetSegmentPredictionTrainedModelMetaDataActionHandler _getSegmentPredictionTrainedModelMetaDataActionHandler;
        private readonly ITrainSegmentPredictionModelActionHandler _trainSegmentPredictionModelActionHandler;

        public SegmentPredictionController(ISegmentPredictionActionHandler segmentPredictionActionHandler, 
            IGetSegmentPredictionTrainedModelMetaDataActionHandler getSegmentPredictionTrainingModelActionHandler,
            ITrainSegmentPredictionModelActionHandler trainSegmentPredictionModelActionHandler)
        {
            _segmentPredictionActionHandler = segmentPredictionActionHandler;
            _getSegmentPredictionTrainedModelMetaDataActionHandler = getSegmentPredictionTrainingModelActionHandler;
            _trainSegmentPredictionModelActionHandler = trainSegmentPredictionModelActionHandler;
        }

        [HttpPost]
        [Authorize]
        [Route("PredictSegment")]
        public async Task<IActionResult> PredictSegment([FromBody] SegmentPredictionRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var response = await _segmentPredictionActionHandler.HandleAsync(new SegmentPredictionRequest(userId, request.SegmentId));

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to predict segment. \n {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("TrainModel")]
        public async Task<IActionResult> TrainModel()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var response = await _trainSegmentPredictionModelActionHandler.HandleAsync(new TrainModelRequest(userId));

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to train model. \n {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        [Route("GetTrainedModelMetaData")]
        public async Task<IActionResult> GetTrainedSegmentPredictionModel()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var trainedModel = await _getSegmentPredictionTrainedModelMetaDataActionHandler.HandleAsync(new GetSegmentPredictionTrainingModelActionHandlerRequest(userId));
                if (trainedModel != null)
                    return Ok(trainedModel);
                else
                    return StatusCode(421, $"No trained segment prediction model exists for user {userId}");

            }
            catch (Exception ex)
            {
                return StatusCode(422, $"Unable to fetch trained model. \n {ex.Message}");
            }
        }
    }
}
