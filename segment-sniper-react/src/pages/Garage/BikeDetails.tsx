import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container } from "react-bootstrap";
import BikeDetailsCard from "../../components/Molecules/Garage/BikeDetails/BikeDetailsCard";
import { useGetBikeByIdQuery } from "../../components/Molecules/Garage/GraphQl/useGetBikeById";
import { AppRoutes } from "../../enums/AppRoutes";

const BikeDetails = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const navigate = useNavigate();
    const {
        data: bikeData,
        loading: bikeLoading,
        error: bikeError
    } = useGetBikeByIdQuery({ variables: { bikeId: bikeId! } });


    if (bikeLoading) return <p>Loading...</p>;
    if (bikeError) {
        return <p>Error: {bikeError?.message}</p>;
    }

    const bike = bikeData?.bikes?.byBikeId;

    if (!bike || !bike.bikeId) {
        return <p>Bike details not found</p>;
    }


    return (
        <Container>
            <Col className="mb-1 ps-1">
                <Button onClick={() => navigate(`/${AppRoutes.Garage}`)}>Back</Button>
            </Col>
            <BikeDetailsCard
                bike={bike} />
        </Container>
    );
};

export default BikeDetails;
