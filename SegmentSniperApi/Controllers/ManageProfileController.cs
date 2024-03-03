using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SegmentSniper.Api.Controllers
{

    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class ManageProfileController : ControllerBase
    {
        public ManageProfileController()
        {
        }

        public async Task<IActionResult> GetProfile()
        {
            return Ok();
        }

        public async Task<IActionResult> UpdatePassword()
        {
            return Ok();
        }

        public async Task<IActionResult> UpdateEmail()
        {
            return Ok();
        }

        public async Task<IActionResult> DeleteAccount()
        {
            return Ok();
        }
    }
}
