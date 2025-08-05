import { Button, Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";
import { useRef, useState } from "react";
import ImportBikesModal from "../../Molecules/Garage/ImportBikes/ImportBikesModal";
import UpsertBikeModal, { UpsertBikeFormValues } from "../../Molecules/Garage/UpsertBike/UpsertBikeModal";
import { useUpsertBikeMutation } from "../../Molecules/Garage/UpsertBike/GraphQl/useUpsertBikeMutation";
import GetBikesByUserId from "../../Molecules/Garage/GraphQl/GetBikesByUserId.graphql";
import useUserStore from "../../../stores/useUserStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FrameType, FrameTypeToEnumMap } from "../../../enums/FrameTypes";
import { GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables } from "../../../graphql/generated";
import { ApolloError } from "@apollo/client";


type GarageModalState =
    | { type: "none" }
    | { type: "import" }
    | { type: "upsertBike" };
export default function GarageMenu() {
    const user = useUserStore((state) => state.user);
    const [modalState, setModalState] = useState<GarageModalState>({ type: "none" });
    const abortRef = useRef<AbortController | null>(null);

    const handleClosedModal = () => {
        abortRef.current?.abort();
        setModalState({ type: "none" });
    }

    const [upsertBike,
        { loading: upsertBikeLoading,
            error: upsertBikeError }
    ] = useUpsertBikeMutation();

    async function handleUpsertBike(values: UpsertBikeFormValues): Promise<boolean> {

        abortRef.current?.abort();
        abortRef.current = new AbortController();

        try {
            const result = await upsertBike({
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
                context: {
                    fetchOptions: {
                        signal: abortRef.current.signal,
                    },
                },
                update: (cache, { data }) => {
                    const newBike = data?.garage?.upsertBike;
                    if (!newBike || !user?.id) return

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

                    } catch (e: unknown) {
                        if (e instanceof DOMException && e.name === 'AbortError') {
                            console.info('Upsert bike request was aborted');
                        } else if (e instanceof ApolloError) {
                            console.error('Apollo error:', e.message, e.graphQLErrors);
                        } else {
                            console.error('Unexpected error upserting bike', e);
                        }
                        return false;
                    }
                },
            });
            handleClosedModal();
            return !!result.data?.garage?.upsertBike;
        } catch (e) {
            console.error("Error upserting bike", e);
            return false
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
                        <Button onClick={() => setModalState({ type: "import" })}>
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
