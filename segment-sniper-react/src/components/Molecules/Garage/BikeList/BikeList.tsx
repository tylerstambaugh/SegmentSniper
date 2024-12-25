import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import { BikeListItem } from './BikeListItem';
import GetBikeByUserId from '../GraphQl/Bikes.graphql';
import useUserStore from '../../../../stores/useUserStore';
import { FrameType, FrameTypeToString } from '../../../../enums/FrameTypes';

type Bike = {
    bikeId: string;
    brandName: string;
    frameType: number;
    metersLogged: number;
    modelName: string;
    name: string;
};

type GetBikesByUserIdResponse = {
    bikes: {
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

    const bikes = data?.bikes?.byUserId || [];

    return (
        <>
            {bikes && bikes.length > 0 ? (
                bikes.map((bike) => (
                    <Card>
                        <Card.Title>
                            <h4>Your Bikes</h4>
                        </Card.Title>
                        <div key={bike.bikeId}>
                            <BikeListItem
                                id={bike.bikeId}
                                name={bike.name}
                                brandName={bike.brandName}
                                modelName={bike.modelName}
                                frameType={FrameTypeToString(bike.frameType)}
                                distanceInMeters={bike.metersLogged}
                            />
                        </div>
                    </Card>
                ))
            ) : (
                <>
                    <Row className=''>
                        <Col>
                            <h4>There are no bikes in your garage</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button>
                                Import Bikes
                            </Button>
                        </Col>
                        <Col>
                            <Button>
                                Manually Add Bike
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

