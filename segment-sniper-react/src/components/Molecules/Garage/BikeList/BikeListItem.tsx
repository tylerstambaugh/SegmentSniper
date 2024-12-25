import { Button, Col, Container, Row } from 'react-bootstrap';
import { FrameType } from '../../../../enums/FrameTypes';
import styles from "./BikeList.module.scss";

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
            <Container >
                <Row>
                    <Col className={styles.cardLabel}> <p>Bike Id</p></Col>
                    <Col ><p>{id}</p></Col>
                </Row>
                <Row>
                    <Col className={styles.cardLabel}><p>Brand</p></Col>
                    <Col><p>{brandName}</p></Col>
                </Row>
                <Row>
                    <Col className={styles.cardLabel}><p>Model</p></Col>
                    <Col><p>{modelName}</p></Col>
                </Row>
                <Row>
                    <Col className={styles.cardLabel}><p>Type</p></Col>
                    <Col><p>{frameType}</p></Col>
                </Row>
                <Row>
                    <Col className={styles.cardLabel}><p>Odometer</p></Col>
                    <Col><p>{distanceInMeters}</p></Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center pb-3'>
                        <Button>
                            Details
                        </Button>
                    </Col>
                </Row>

            </Container >
        </>
    );
};
