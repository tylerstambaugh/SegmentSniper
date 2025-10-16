import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./BikeList.module.scss";
import { AppRoutes } from '../../../../enums/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useConversionHelpers } from '../../../../hooks/useConversionHelpers';

export type BikeListItemProps = {
    id: string;
    brandName?: string;
    modelName?: string;
    frameType?: string;
    distanceInMeters?: number;
};

export const BikeListItem = ({
    id,
    brandName,
    modelName,
    frameType,
    distanceInMeters,
}: BikeListItemProps) => {
    const navigate = useNavigate();
    const convert = useConversionHelpers();
    return (
        <>
            <Container >
                <Row className={styles.bikeDataRow}>
                    <Col className={styles.cardLabel}>Bike Id</Col>
                    <Col className={styles.cardDataItem}>{id}</Col>
                </Row>
                <Row className={styles.bikeDataRow}>
                    <Col className={styles.cardLabel}>Brand</Col>
                    <Col className={styles.cardDataItem}>{brandName}</Col>
                </Row>
                <Row className={styles.bikeDataRow}>
                    <Col className={styles.cardLabel}>Model</Col>
                    <Col className={styles.cardDataItem}>{modelName}</Col>
                </Row>
                <Row className={styles.bikeDataRow}>
                    <Col className={styles.cardLabel}>Type</Col>
                    <Col className={styles.cardDataItem}>{frameType}</Col>
                </Row>
                <Row className={styles.bikeDataRow}>
                    <Col className={styles.cardLabel}>Odometer</Col>
                    <Col className={styles.cardDataItem}>{convert.ConvertMetersToMiles(distanceInMeters)} miles</Col>
                </Row>
                <Row className={styles.bikeDataRow}>
                    <Col className='d-flex justify-content-center pb-2 pt-1'>
                        <Button
                            className='d-flex justify-content-center'
                            onClick={() => {
                                navigate(`/${AppRoutes.BikeDetails.replace(':bikeId', id)}`);
                            }}
                        >
                            Details
                        </Button>
                    </Col>
                </Row>

            </Container >
        </>
    );
};

export default BikeListItem;
