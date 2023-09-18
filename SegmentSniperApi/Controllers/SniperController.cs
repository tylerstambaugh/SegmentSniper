using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SegmentSniper.Api.Controllers
{
    [Authorize]
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SniperController : ControllerBase
    {
        public SniperController() 
        {
            //get summary activity for time range

            //get detailed activity by ID

            //get detailed segment by ID

            //star segment

            //
        }
    }
}
