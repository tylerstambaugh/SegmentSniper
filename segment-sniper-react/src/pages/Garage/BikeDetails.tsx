import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container } from "react-bootstrap";
import BikeDetailsCard from "../../components/Molecules/Garage/BikeDetails/BikeDetailsCard";
import { useGetBikeByIdQuery } from "../../components/Molecules/Garage/GraphQl/useGetBikeById";
import { AddEquipmentFormValues } from "../../components/Molecules/Garage/BikeDetails/Equipment/AddEquipmentForm";
import { useAddEquipmentToBikeMutation } from "../../components/Molecules/Garage/BikeDetails/Equipment/GraphQl/useAddEquipmentToBike";
import { EquipmentInput, Maybe } from "../../graphql/generated";
import useUserStore from "../../stores/useUserStore";
import { AppRoutes } from "../../enums/AppRoutes";
import { DateTime } from "luxon";
import { useRetireBikeEquipmentMutation } from "../../components/Molecules/Garage/BikeDetails/Equipment/GraphQl/useRetireBikeQuipment";


export interface RetireBikeEquipmentValues {
    bikeId: string;
    equipmentId: string;
    userId: string;
    retireDate: Maybe<DateTime>;
}
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

    const [retireBikeEquipment,
        { data: retireBikeQuipmentData,
            loading: retieBikeQuipmentLoading,
            error: retireBikeQuipmentError }] = useRetireBikeEquipmentMutation();

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

    async function handleAddEquipmentSubmit(values: AddEquipmentFormValues) {

        const installDate = values.installDate
            ? DateTime.fromISO(values.installDate as unknown as string).toISO()
            : null;

        const retiredDate = values.retiredDate
            ? DateTime.fromISO(values.retiredDate as unknown as string).toISO()
            : null;

        const equipmentInput: EquipmentInput = {
            name: values.name,
            description: values.description,
            milesLogged: values.milesLogged ?? 0,
            installDate: installDate,
            retiredDate: retiredDate,
            price: values.price ?? 0,
            replaceAtMiles: values.replaceAtMiles ?? 0,
            milesUntilReplaceReminder: values.milesUntilReplaceReminder ?? 0
        }
        addEquipmentToBike({
            variables: {
                bikeId: bike!.bikeId,
                equipment: equipmentInput,
                userId: user?.id ?? '',
            },
        });
    }

    async function handleRetireEquipment(values: RetireBikeEquipmentValues) {

        retireBikeEquipment({
            variables: {
                bikeId: values.bikeId,
                equipmentId: values.equipmentId,
                userId: user?.id ?? '',
                retireDate: values.retireDate?.toISO() ?? ""
            }
        })
    }

    return (
        <Container>
            <Col className="mb-1 ps-1">

                <Button onClick={() => navigate(`/${AppRoutes.Garage}`)}>Back</Button>
            </Col>
            <BikeDetailsCard
                bike={bike}
                handleAddEquipmentSubmit={handleAddEquipmentSubmit}
                handleRetireEquipment={handleRetireEquipment} />
        </Container>
    );
};

export default BikeDetails;
