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

        public SniperController(IGetSummaryActivityForTimeRangeActionHandler getSummaryActivityForTimeRangeActionHandler)
        {
            _getSummaryActivityForTimeRangeActionHandler = getSummaryActivityForTimeRangeActionHandler;
        }


        [HttpPost]
        public IActionResult GetSummaryActivityForTimeRange([FromBody] DateRangeParametersContract contract)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();


            GetSummaryActivityForTimeRangeRequest request = new GetSummaryActivityForTimeRangeRequest((DateTime)contract.StartDate, (DateTime)contract.EndDate, contract.ActivityType);

            var returnList = _getSummaryActivityForTimeRangeActionHandler.Handle(request);

            if (returnList != null)
                return Ok(returnList);
            else
                return BadRequest("No activity found with that Id");
        }
        //get detailed activity by ID

        //get detailed segment by ID

        //star segment

    }
}
