//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data.Entities.Auth;
//using SegmentSniper.Models.Models.Auth.User;
//using SegmentSniper.Services.AuthServices;

//namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
//{
//    public class RegisterUserActionHandler : IRegisterUserActionHandler
//    {
//        private readonly IRegisterUser _registerUserService;
//        private readonly UserManager<ApplicationUser> _userManager;

//        public RegisterUserActionHandler(IRegisterUser registerUserService, UserManager<ApplicationUser> userManager)
//        {
//            _registerUserService = registerUserService;
//            _userManager = userManager;
//        }

//        public async Task<UserDto> HandleAsync(RegisterUserRequest request)
//        {
//            ValidateRequest(request);

//            var existingUser = await _userManager.FindByEmailAsync(request.User.Email);
//            if(existingUser != null) 
//            {
//                throw new ApplicationException("An account with that email address already exists");
//            }

//            var contract = new RegisterUserContract(new RegisterUserDto
//            {
//                Email = request.User.Email,
//                FirstName = request.User.FirstName,
//                Password = request.User.Password,
//            });

//            var user = await _registerUserService.ExecuteAsync(contract);

//            return user.RegisteredUser;
//        }

//        private void ValidateRequest(RegisterUserRequest request)
//        {
//            if (request == null)
//            {
//                throw new ArgumentNullException(nameof(request));
//            }

//            if(request.User == null)
//            {
//                throw new ArgumentNullException(nameof(request.User));
//            }

//            if (string.IsNullOrWhiteSpace(request.User.Email))
//            {
//                throw new ArgumentNullException(nameof(request.User.Email));
//            }

//            if (string.IsNullOrWhiteSpace(request.User.FirstName))
//            {
//                throw new ArgumentNullException(nameof(request.User.FirstName));
//            }

//            if (string.IsNullOrWhiteSpace(request.User.Password))
//            {
//                throw new ArgumentNullException(nameof(request.User.Password));
//            }

//            if (string.IsNullOrEmpty(request.User.Email))
//            {
//                throw new ArgumentNullException(nameof(request.User.Email));
//            }

//            if (string.IsNullOrEmpty(request.User.FirstName))
//            {
//                throw new ArgumentNullException(nameof(request.User.FirstName));
//            }

//            if (string.IsNullOrEmpty(request.User.Password))
//            {
//                throw new ArgumentNullException(nameof(request.User.Password));
//            }
//        }

//    }
//}
