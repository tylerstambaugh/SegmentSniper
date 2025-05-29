import { Button, Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";
import { useState } from "react";
import ImportBikesModal from "../../Molecules/Garage/ImportBikes/ImportBikesModal";
import UpsertBikeModal, { UpsertBikeFormValues } from "../../Molecules/Garage/UpsertBike/UpsertBikeModal";
import { useUpsertBikeMutation } from "../../Molecules/Garage/UpsertBike/GraphQl/useUpsertBikeMutation";
import useUserStore from "../../../stores/useUserStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FrameType, FrameTypeToEnumMap } from "../../../enums/FrameTypes";


type GarageModalState =
    | { type: "none" }
    | { type: "import" }
    | { type: "upsertBike" };
export default function GarageMenu() {
    const user = useUserStore((state) => state.user);
    const [modalState, setModalState] = useState<GarageModalState>({ type: "none" });
    const handleClosedModal = () => {
        setModalState({ type: "none" });
    }

    const [upsertBike,
        { loading: upsertBikeLoading,
            error: upsertBikeError }
    ] = useUpsertBikeMutation(

            // {
            //     update(cache, { data }) {
            //         const updatedBike = data?.garage?.upsertBikeEquipment;
            //         if (!updatedBike) return;

            //         cache.writeQuery({
            //             query: GetBikeByIdQuery,
            //             variables: { bikeId: updatedBike.bikeId },
            //             data: {
            //                 bikes: {
            //                     __typename: "BikeQuery",
            //                     byBikeId: updatedBike,
            //                 },
            //             },
            //         });
            //     },
            // }
        );

    async function handleUpsertBike(values: UpsertBikeFormValues) {

        try {
            await upsertBike({
                variables: {
                    userId: user?.id ?? '',
                    bike: {
                        name: values.bikeName,
                        frameType: FrameTypeToEnumMap[values.bikeFrameType as FrameType],
                        brandName: values.bikeBrand,
                        modelName: values.bikeModel,
                        metersLogged: values.bikeMetersLogged,
                        description: values.bikeDescription,
                    }
                }
            }
            );
            handleClosedModal();
        } catch (e) {
            console.error("Error upserting bike", e);
        }
    }

    return (
        <>
            <ImportBikesModal
                show={modalState.type === "import"}
                onClose={handleClosedModal} />

            <UpsertBikeModal
                show={modalState.type === "upsertBike"}
                onClose={handleClosedModal}
                handleUpsertBike={handleUpsertBike}
                error={upsertBikeError} />
            <Container className="pt-2">
                <Row>
                    <Col>
                        <h2>Your Garage </h2>
                        <BikeList />
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button onClick={() => {
                            console.log("Import bikes clicked");
                        }}>
                            Import Bikes
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button onClick={() => setModalState({ type: "upsertBike" })}>
                            <FontAwesomeIcon icon={faPlus} /> Manually Add Bike
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
