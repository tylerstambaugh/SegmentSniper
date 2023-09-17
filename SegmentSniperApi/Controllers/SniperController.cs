using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class SniperController : ControllerBase
    {
        public SniperController() 
        {
            
        }
    }
}
