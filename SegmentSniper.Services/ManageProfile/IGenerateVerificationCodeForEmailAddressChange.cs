using Microsoft.Extensions.Diagnostics.HealthChecks;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IGenerateVerificationCodeForEmailAddressChange : IExecutableServiceAsync<GenerateVerificationCodeForEmailAddressChangeContract, GenerateVerificationCodeForEmailAddressChangeContract.Result>
    {
        Task<GenerateVerificationCodeForEmailAddressChangeContract.Result> ExecuteAsync(GenerateVerificationCodeForEmailAddressChangeContract contract);
    }

    public class GenerateVerificationCodeForEmailAddressChangeContract
    {
        public GenerateVerificationCodeForEmailAddressChangeContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; } 
        public class Result
        {
            public int Code { get; set; }
            public bool CodeSaved {  get; set; }
        }
    }
}