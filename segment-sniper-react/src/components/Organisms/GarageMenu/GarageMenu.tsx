import { Button, Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";
import { useState } from "react";
import ImportBikesModal from "../../Molecules/Garage/ImportBikes/ImportBikesModal";
import UpsertBikeModal, { UpsertBikeFormValues } from "../../Molecules/Garage/UpsertBike/UpsertBikeModal";
import { useUpsertBikeMutation } from "../../Molecules/Garage/UpsertBike/GraphQl/useUpsertBikeMutation";
import GetBikesByUserId from "../../Molecules/Garage/GraphQl/GetBikesByUserId.graphql";
import useUserStore from "../../../stores/useUserStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FrameType, FrameTypeToEnumMap } from "../../../enums/FrameTypes";
import { GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables } from "../../../graphql/generated";


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
    ] = useUpsertBikeMutation();

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
                    },
                },
                update: (cache, { data }) => {
                    const newBike = data?.garage?.upsertBike;
                    if (!newBike || !user?.id) return;

                    const queryVars: GetBikesByUserIdQueryVariables = {
                        userId: user.id,
                    };

                    try {
                        const existingData = cache.readQuery<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>({
                            query: GetBikesByUserId,
                            variables: queryVars,
                        });

                        if (!existingData?.bikes?.byUserId) return;

                        cache.writeQuery<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>({
                            query: GetBikesByUserId,
                            variables: queryVars,
                            data: {
                                bikes: {
                                    ...existingData.bikes,
                                    byUserId: [...existingData.bikes.byUserId, newBike],
                                },
                            },
                        });
                    } catch (error) {
                        console.warn('Apollo cache update failed:', error);
                    }
                },
            });
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
                loading={upsertBikeLoading}
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
