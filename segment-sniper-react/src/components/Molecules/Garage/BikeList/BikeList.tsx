import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import { BikeListItem } from './BikeListItem';
import GetBikeByUserId from '../GraphQl/Bikes.graphql';
import useUserStore from '../../../../stores/useUserStore';
import { FrameType, FrameTypeToString } from '../../../../enums/FrameTypes';
import styles from "./BikeList.module.scss";
import sortBy from 'lodash/sortBy';
import { Bike } from '../../../../models/Garage/Bike';

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

    const sortedBikes = sortBy(bikes, ['metersLogged']).reverse();

    return (
        <>
            {/*      */}
            <Container className='p-2 d-flex flex-column flex-md-row justify-content-between'>
                {bikes && bikes.length > 0 ? (
                    sortedBikes.map((bike: Bike) => (
                        <Container className='pb-3'>
                            <Row className='justify-content-around'>
                                <Col lg={6}>
                                    <Card className="shadow">
                                        <Col className='justify-content-center'>
                                            <Card.Title className={styles.bikeCardTitle}>
                                                <h4>{bike.name}</h4>
                                            </Card.Title>
                                        </Col>
                                        <div key={bike.bikeId} className='justify-content-center'>
                                            <BikeListItem
                                                id={bike.bikeId}
                                                brandName={bike.brandName}
                                                modelName={bike.modelName}
                                                frameType={FrameTypeToString(bike.frameType)}
                                                distanceInMeters={bike.metersLogged}
                                            />
                                        </div>
                                    </Card>
                                </Col>
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

