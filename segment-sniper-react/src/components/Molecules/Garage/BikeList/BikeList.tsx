import { Card, Col, Container, Row } from 'react-bootstrap';
import { BikeListItem } from './BikeListItem';

import { FrameType, FrameTypeToString } from '../../../../enums/FrameTypes';
import styles from "./BikeList.module.scss";
import sortBy from 'lodash/sortBy';
import { useGetBikesByUserIdQuery } from '../GraphQl/useGetBikesByAuthUserId';

export const BikeList = () => {
    const { data, loading, error } = useGetBikesByUserIdQuery();

    if (loading) return <p>Loading...</p>;
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const bikes = data?.bikes?.byAuthUserId || [];

    const sortedBikes = sortBy(bikes, ['metersLogged']).reverse();

    return (
        <>
            <Container className='p-2 d-flex flex-column flex-md-row justify-content-between'>
                {bikes && bikes.length > 0 ? (
                    sortedBikes.map((bike, index) => bike && (
                        <Container className='pb-3' key={`${bike.bikeId}+${index}`}>
                            <Row className='justify-content-around'>
                                <Col sm={3} md={12}>
                                    <Card className="shadow">
                                        <Row>
                                            <Col className='justify-content-center'>
                                                <Card.Title className={styles.bikeCardTitle}>
                                                    <h4>{bike.name}</h4>
                                                </Card.Title>
                                            </Col>
                                            <div key={bike.bikeId} className='justify-content-center'>
                                                <BikeListItem
                                                    id={bike.bikeId ?? "N/A"}
                                                    brandName={bike.brandName ?? "N/A"}
                                                    modelName={bike.modelName ?? "N/A"}
                                                    frameType={FrameTypeToString(bike.frameType ?? 0) ?? FrameType.NONE}
                                                    distanceInMeters={bike.metersLogged ?? 0}
                                                />
                                            </div>
                                        </Row>
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

