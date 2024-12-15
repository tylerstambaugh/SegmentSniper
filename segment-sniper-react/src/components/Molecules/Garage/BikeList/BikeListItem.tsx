import { Col, Container, Row } from 'react-bootstrap';
import { FrameType } from '../../../../enums/frameTypes';

export type BikeListItemProps = {
    id: string;
    name: string;
    brandName: string;
    modelName: string;
    frameType: string;
    distanceInMeters: number;
};

export const BikeListItem = ({
    id,
    name,
    brandName,
    modelName,
    frameType,
    distanceInMeters,
}: BikeListItemProps) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <p>Bike Id</p>
                    </Col>
                    <Col>
                        <p>Name</p>
                    </Col>
                    <Col>
                        <p>Brand</p>
                    </Col>
                    <Col>
                        <p>Model</p>
                    </Col>
                    <Col>
                        <p>Type</p>
                    </Col>
                    <Col>
                        <p>Bike Id</p>
                    </Col>
                    <Col>
                        <p>Distance</p>
                    </Col>
                </Row>
                <Row>
                    <Col><p>{id}</p></Col>
                    <Col><p>{name}</p></Col>
                    <Col><p>{brandName}</p></Col>
                    <Col><p>{modelName}</p></Col>
                    <Col><p>{frameType}</p></Col>
                    <Col><p>{distanceInMeters}</p></Col>

                </Row>
            </Container>
        </>
    );
};
