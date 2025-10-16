import { Card, Col, Container, Row } from 'react-bootstrap';
import { BikeListItem } from './BikeListItem';
import { FrameType, FrameTypeToString } from '../../../../enums/FrameTypes';
import styles from "./BikeList.module.scss";
import sortBy from 'lodash/sortBy';
import { useGetBikesByUserIdQuery } from '../GraphQl/useGetBikesByAuthUserId';

export const BikeList = () => {
  const { data, loading, error } = useGetBikesByUserIdQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bikes = data?.bikes?.byAuthUserId || [];
  const sortedBikes = sortBy(bikes, ['metersLogged']).reverse();

  return (
<Container className="p-2">
  {bikes && bikes.length > 0 ? (
    <Row className="g-3 justify-content-center">
      {sortedBikes.map((bike, index) => (
        <Col
          key={`${bike?.bikeId}-${index}`}
          sm={12}    
          md={6}      
          lg={4}
          className="d-flex justify-content-center"
        >
          <Card className="shadow h-100 w-100" style={{ maxWidth: '350px' }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className={`${styles.bikeCardTitle} text-center`}>
                <h4>{bike?.name}</h4>
              </Card.Title>
              <BikeListItem
                id={bike?.bikeId ?? "N/A"}
                brandName={bike?.brandName ?? "N/A"}
                modelName={bike?.modelName ?? "N/A"}
                frameType={FrameTypeToString(bike?.frameType ?? 0) ?? FrameType.NONE}
                distanceInMeters={bike?.metersLogged ?? 0}
              />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <Row>
      <Col>
        <h4>There are no bikes in your garage</h4>
      </Col>
    </Row>
  )}
</Container>

  );
};
