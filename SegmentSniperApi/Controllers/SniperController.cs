using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using SegmentSniper.Api.ActionHandlers.SniperActionHandlers;
using SegmentSniper.Api.Controllers.Contracts;
using System.Security.Claims;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.Controllers
{
    [Authorize]
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SniperController : ControllerBase
    {
        private readonly IGetSummaryActivityForTimeRangeActionHandler _getSummaryActivityForTimeRangeActionHandler;

        public SniperController(IGetSummaryActivityForTimeRangeActionHandler getSummaryActivityForTimeRangeActionHandler) 
        {
            _getSummaryActivityForTimeRangeActionHandler = getSummaryActivityForTimeRangeActionHandler;
        }


        public IActionResult GetSummaryActivityForTimeRange([FromBody] DateRangeParametersContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();

            ActivityType parsedActivity;
            if (Enum.TryParse<ActivityType>(contract.ActivityType, true, out parsedActivity));

            if (parsedActivity != null)
            {
                GetSummaryActivityForTimeRangeRequest request = new GetSummaryActivityForTimeRangeRequest
                {

                }

            }

            if (returnList != null)
                return Ok(returnList);
            else
                return BadRequest("No activity found with that Id");
            //get detailed activity by ID

            //get detailed segment by ID

            //star segment

            //
        }
}
