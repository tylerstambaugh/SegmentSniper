﻿using SegmentSniper.Models.Models.Strava.Token;

namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IAddStravaToken
    {
        AddStravaTokenContract.Result Execute(AddStravaTokenContract contract);

    }
    public class AddStravaTokenContract
    {
        public AddStravaTokenContract(string userId, StravaApiTokenModel token)
        {
            UserId = userId;
            Token = token;
        }
        public string UserId { get; set; }
        public StravaApiTokenModel Token { get; set; }
        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }
            public bool Success { get; set; }
        }
    }

}
