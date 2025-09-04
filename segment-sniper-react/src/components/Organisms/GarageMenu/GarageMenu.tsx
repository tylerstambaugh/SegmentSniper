import { Button, Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";
import { useRef, useState } from "react";
import ImportBikesModal from "../../Molecules/Garage/ImportBikes/ImportBikesModal";
import UpsertBikeModal, { UpsertBikeFormValues } from "../../Molecules/Garage/UpsertBike/UpsertBikeModal";
import { useUpsertBikeMutation } from "../../Molecules/Garage/UpsertBike/GraphQl/useUpsertBikeMutation";
import GetBikesByAuthUserId from "../../Molecules/Garage/GraphQl/GetBikesByAuthUserId.graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FrameType, FrameTypeToEnumMap } from "../../../enums/FrameTypes";

import { ApolloError } from "@apollo/client";
import { useUser } from "@clerk/clerk-react";
import { GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables } from "../../../graphql/generated";


type GarageModalState =
    | { type: "none" }
    | { type: "import" }
    | { type: "upsertBike" };
export default function GarageMenu() {
    const user = useUser();
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
                    userId: user?.user?.id ?? '',
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
                    if (!newBike || !user?.user?.id) return

                    const queryVars: GetBikesByAuthUserIdQueryVariables = {
                        authUserId: user?.user?.id ?? '',
                    };

                    try {
                        const existingData = cache.readQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>({
                            query: GetBikesByAuthUserId,
                            variables: queryVars,
                        });

                        if (!existingData?.bikes?.byAuthUserId) return;

                        cache.writeQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>({
                            query: GetBikesByAuthUserId,
                            variables: queryVars,
                            data: {
                                bikes: {
                                    ...existingData.bikes,
                                    byAuthUserId: [...existingData.bikes.byAuthUserId, newBike],
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
