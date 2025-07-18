﻿using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public interface ILoginUserActionHandler

    {
        Task<LoginUserRequest.Response> Handle(LoginUserRequest request);
    }

    public class LoginUserRequest
    {
        public LoginUserRequest(UserLogin userLogin)
        {
            UserLogin = userLogin;
        }
        public UserLogin UserLogin { get; set; }
        public class Response
        {
           
            public UserDto? UserData { get; set; }
            public SegmentSniperTokenData? TokenData { get; set; }
            public string? ErrorMessage { get; set; }
        }
    }
}