import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import { BikeListItem } from './BikeListItem';

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

const GET_BIKES_BY_USER_ID = gql`
  query GetBikesByUserId($userId: ID!) {
    Bikes {
      byUserId(userId: $userId) {
        bikeId
        name
        brandName
        modelName
        frameType
        metersLogged
      }
    }
  }
`;

export const BikeList = ({ userId }: { userId: string }) => {
    const { data, loading, error } = useQuery<GetBikesByUserIdResponse>(GET_BIKES_BY_USER_ID, {
        variables: { userId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {data?.Bikes?.byUserId?.map((bike) => (
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
            ))}
        </>
    );
};

