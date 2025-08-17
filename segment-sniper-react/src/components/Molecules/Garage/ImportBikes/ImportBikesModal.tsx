import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import useUserStore from "../../../../stores/useUserStore";
import { useImportGarage } from "./GraphQl/useImportGarage";
import toast from "react-hot-toast";
import { useRef } from "react";
import { BikeModel, GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables } from "../../../../graphql/generated";
import GetBikesByUserId from "../../../Molecules/Garage/GraphQl/GetBikesByUserId.graphql";
import { ApolloError } from "@apollo/client";


export type ImportBikesModalProps = {
    show: boolean;
    onClose: () => void;
};

const ImportBikesModal = ({ show, onClose }: ImportBikesModalProps) => {
    const abortRef = useRef<AbortController | null>(null);


    const userId = useUserStore((state) => state.user?.id);
    const [importGarage, { loading,
        error }] = useImportGarage();


    async function handleImport(): Promise<boolean> {

        abortRef.current?.abort();
        abortRef.current = new AbortController();

        if (!userId) {
            console.error("User ID is not available");
            return false;
        }

        try {
            const result = await importGarage({
                variables: {
                    userId: userId ?? "",
                },

                context: {
                    fetchOptions: {
                        signal: abortRef.current.signal,
                    },
                },

                update: (cache, { data }) => {
                    const newBike = data?.garage?.upsertBike;
                    if (!newBike || !userId) return

                    const queryVars: GetBikesByUserIdQueryVariables = {
                        userId: userId,
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
                onCompleted: () => {
                    toast.success("Bikes imported successfully!");
                    onClose();
                },
                onError: (error) => {
                    toast.error(`Error importing bikes: ${error.message}`);
                }

            });
            onClose();
            return !!result.data?.garage?.importGarage;
        } catch (e) {
            console.error("Error importing bikes", e);
            toast.error("Failed to import bikes. Please try again.");
            return false;
        }
    }

    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Import Bikes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="m-3">
                        This will query your strava activities for the last year and add any bikes you've ridden to your garage.
                    </Row>
                    <Row className="mb-3 justify-content-center">
                        <Col className="text-center">
                            {loading ? (
                                <>
                                    <Button variant="secondary" className={`me-1 `}>
                                        <Spinner
                                            as="span"
                                            variant="light"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border"
                                        />
                                    </Button>
                                </>
                            ) : (
                                <Button variant="primary" onClick={handleImport}>
                                    Import
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default ImportBikesModal;