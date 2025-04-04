﻿using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IUpsertBike
    {
       Task <AddBikeContract.Result> ExecuteAsync(AddBikeContract contrect);
    }

    public class AddBikeContract
    {
        public BikeModel Bike { get; set; }
        public class Result
        {
            public required string BikeId { get; set; }
        }
    }
}