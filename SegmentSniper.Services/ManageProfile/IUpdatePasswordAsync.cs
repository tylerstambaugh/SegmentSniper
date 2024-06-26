﻿using SegmentSniper.Models.Models.ManageProfile;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IUpdatePasswordAsync : IExecutableServiceAsync<UpdatePasswordAsyncContract, UpdatePasswordAsyncContract.Result>
    {
        Task<UpdatePasswordAsyncContract.Result> ExecuteAsync(UpdatePasswordAsyncContract contract);
    }

    public class UpdatePasswordAsyncContract
    {
        public UpdatePasswordAsyncContract(string currentPassword, string newPassword, string userId)
        {
            UserId = userId;
            CurrentPassword = currentPassword;
            NewPassword = newPassword;

        }

        public string UserId { get; set; }
        public string CurrentPassword { get;  }
        public string NewPassword { get; }

        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }

            public bool Success { get;  }
        }
    }
}