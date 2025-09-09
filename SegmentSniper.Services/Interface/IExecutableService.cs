using System;
using System.Threading.Tasks;

namespace SegmentSniper.Services.Interface
{
    public interface IExecutableService<in TContract, out TResult>
    {
        TResult Execute(TContract contract);
    }

    public interface IExecutableService<in TContract>
    {
        void Execute(TContract contract);
    }

    public interface IExecutableServiceAsync<TContract, TResult>
    {
       Task<TResult> ExecuteAsync(TContract contract);
    }

    public interface IExecutableServiceAsync<TContract>
    {
        Task ExecuteAsync(TContract contract);
    }
}
