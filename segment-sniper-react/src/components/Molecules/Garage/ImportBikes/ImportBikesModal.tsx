import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";

import { useImportGarage } from "./GraphQl/useImportGarage";
import toast from "react-hot-toast";
import { useRef } from "react";
import { BikeModel, GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables } from "../../../../graphql/generated";
import GetBikesByAuthUserId from "../../../Molecules/Garage/GraphQl/GetBikesByAuthUserId.graphql";
import { ApolloError } from "@apollo/client";


export type ImportBikesModalProps = {
    show: boolean;
    onClose: () => void;
};

const ImportBikesModal = ({ show, onClose }: ImportBikesModalProps) => {
    const abortRef = useRef<AbortController | null>(null);

    const [importGarage, { loading,
        error }] = useImportGarage();


    async function handleImport(): Promise<boolean> {

        abortRef.current?.abort();
        abortRef.current = new AbortController();


        try {
            const result = await importGarage({
                context: {
                    fetchOptions: {
                        signal: abortRef.current.signal,
                    },
                },

                update: (cache, { data }) => {
                    const newBike = data?.garage?.upsertBike;
                    if (!newBike) return
                 
                    try {
                        const existingData = cache.readQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>({
                            query: GetBikesByAuthUserId,
                        });

                        if (!existingData?.bikes?.byAuthUserId) return;

                        cache.writeQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>({
                            query: GetBikesByAuthUserId,
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