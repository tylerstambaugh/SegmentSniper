import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BikeDetailsCard from "../../components/Molecules/Garage/BikeDetails/BikeDetailsCard";
import { useGetBikeByIdQuery } from "../../components/Molecules/Garage/GraphQl/useGetBikeById";
import { AddEquipmentFormValues } from "../../components/Molecules/Garage/BikeDetails/Equipment/AddEquipmentForm";
import { useAddEquipmentToBikeMutation } from "../../components/Molecules/Garage/BikeDetails/Equipment/GraphQl/useAddEquipmentToBike";
import { EquipmentInput } from "../../graphql/generated";
import useUserStore from "../../stores/useUserStore";
import { useEffect } from "react";
import { AppRoutes } from "../../enums/AppRoutes";

const BikeDetails = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const {
        data: bikeData,
        loading: bikeLoading,
        error: bikeError
    } = useGetBikeByIdQuery({ variables: { bikeId: bikeId! } });

    const [
        addEquipmentToBike,
        { data: addEquipmentData, loading: addEquipmentLoading, error: addEquipmentError }
    ] = useAddEquipmentToBikeMutation();

    if (bikeLoading || addEquipmentLoading) return <p>Loading...</p>;
    if (bikeError || addEquipmentError) {
        console.log("Error: ", bikeError || addEquipmentError);
        return <p>Error: {bikeError?.message || addEquipmentError?.message}</p>;
    }

    const bike = bikeData?.bikes?.byBikeId;

    if (!bike || !bike.bikeId) {
        return <p>Bike details not found</p>;
    }

    // useEffect(() => {
    //     if (addEquipmentError && addEquipmentError.message.includes('Unauthorized')) {
    //         // Redirect to login or show an error message
    //         console.error('User is not authorized. Please log in.');
    //     }
    // }, [addEquipmentError]);

    function handleAddEquipmentSubmit(values: AddEquipmentFormValues) {

        const equipmentInput: EquipmentInput = {
            name: values.name,
            description: values.description,
            milesLogged: values.milesLogged,
            installDate: values.installDate?.toISODate() ?? null,
            retiredDate: values.retiredDate?.toISODate() ?? null,
            price: values.price,
            replaceAtMiles: values.replaceAtMiles,
            milesUntilReplaceReminder: values.milesUntilReplaceReminder
        }
        addEquipmentToBike({
            variables: {
                bikeId: bike!.bikeId,
                equipment: equipmentInput, // Assuming `values` match `EquipmentInput` structure
                userId: user?.id ?? '', // Replace with actual user ID
            },
        });
    }

    return (
        <Container>
            <Col className="mb-1 ps-1">

                <Button onClick={() => navigate(`/${AppRoutes.Garage}`)}>Back</Button>
            </Col>
            <BikeDetailsCard bike={bike} handleAddEquipmentSubmit={handleAddEquipmentSubmit} />
        </Container>
    );
};

export default BikeDetails;
