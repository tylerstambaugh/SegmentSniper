import { useParams } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import { useQuery } from "@apollo/client";
import { List } from "lodash";
import { Equipment } from "../../models/Garage/Equipment";
import { Bike } from "../../models/Garage/Bike";
import GetBikeDetailsById from "../../components/Molecules/Garage/GraphQl/Bikes.graphql";
import { Card, Container } from "react-bootstrap";
import BikeDetailsCard from "../../components/Molecules/Garage/BikeDetails/BikeDetailsCard";

type GetBikeDetailsByIdResponse = {
    bike: {
        byId: {
            bike: Bike;
            equipment: List<Equipment>;
        };
    };
}

const BikeDetails = () => {
    const { bikeId } = useParams<{ bikeId: string }>();

    const userId = useUserStore((state) => state.user?.id)
    const { data, loading, error } = useQuery<GetBikeDetailsByIdResponse>(GetBikeDetailsById, { variables: { bikeId, userId } });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log("GetBikesByUserId query error: ", error);
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container>
            <BikeDetailsCard bike={data?.bike?.byId?.bike} />
        </Container>
    )
}

export default BikeDetails;