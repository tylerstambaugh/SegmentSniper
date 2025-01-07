import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import BikeDetailsCard from "../../components/Molecules/Garage/BikeDetails/BikeDetailsCard";
import { useGetBikeByIdQuery } from "../../components/Molecules/Garage/GraphQl/useGetBikeById";


const BikeDetails = () => {
    const { bikeId } = useParams<{ bikeId: string }>();

    const { data, loading, error } = useGetBikeByIdQuery({ variables: { bikeId: bikeId! } });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log("GetBikesByUserId query error: ", error);
        return <p>Error: {error.message}</p>;
    }

    const bike = data?.bikes?.byBikeId;

    if (!bike || !bike.bikeId) {
        return <p>Bike details not found</p>;
    }


    return (
        <Container>
            <BikeDetailsCard bike={bike} />
        </Container>
    )
}

export default BikeDetails;