import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import { BikeListItem } from './BikeListItem';
import GetBikeByUserId from '../GraphQl/Bikes.graphql';
import useUserStore from '../../../../stores/useUserStore';

type Bike = {
    bikeId: string;
    name: string;
    brandName: string;
    modelName: string;
    frameType: string;
    metersLogged: number;
};

type GetBikesByUserIdResponse = {
    Bikes: {
        byUserId: Bike[];
    };
};



export const BikeList = () => {
    const userId = useUserStore((state) => state.user?.id)
    const { data, loading, error } = useQuery<GetBikesByUserIdResponse>(GetBikeByUserId, { variables: { userId } });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log("GetBikesByUserId query error: ", error);
        return <p>Error: {error.message}</p>;
    }

    const bikes = data?.Bikes?.byUserId || [];
    return (
        <>
            {bikes && bikes.length > 0 ? (
                bikes.map((bike) => (
                    <div key={bike.bikeId}>
                        <BikeListItem
                            id={bike.bikeId}
                            name={bike.name}
                            brandName={bike.brandName}
                            modelName={bike.modelName}
                            frameType={bike.frameType}
                            distanceInMeters={bike.metersLogged}
                        />
                    </div>
                ))
            ) : (
                <h4>Bike list is emppty</h4>
            )}
        </>
    );
};

