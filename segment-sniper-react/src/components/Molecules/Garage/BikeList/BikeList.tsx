import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
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
            <Container className='p-2 d-flex flex-column flex-md-row justify-content-between'>
                {bikes && bikes.length > 0 ? (
                    bikes.map((bike) => (
                        <Container className='pb-3'>
                            <Row xs={12} lg={4} className='d-flex'>
                                <Card className="shadow">
                                    <Col className='d-flex justify-content-center'>
                                        <Card.Title>
                                            <h4>{bike.name}</h4>
                                        </Card.Title>
                                    </Col>
                                    <div key={bike.bikeId} className='d-flex justify-content-center'>
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
                            </Row>
                        </Container>
                    ))
                ) : (
                    <>
                        <Row className=''>
                            <Col>
                                <h4>There are no bikes in your garage</h4>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

