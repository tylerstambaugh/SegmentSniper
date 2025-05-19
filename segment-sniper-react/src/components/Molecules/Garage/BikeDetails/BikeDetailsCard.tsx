import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import EquipmentList from "./Equipment/EquipmentList";
import { BikeModel } from "../../../../graphql/generated";
import _ from "lodash";
import { useConversionHelpers } from "../../../../hooks/useConversionHelpers";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteBikeMutation } from "../GraphQl/useDeleteBike";
import useUserStore from "../../../../stores/useUserStore";
import DeleteBikeModal from "./DeleteBikeModal";


type BikeDetailsCardProps = {
    bike: BikeModel;
}

const BikeDetailsCard = ({ bike }: BikeDetailsCardProps) => {
    const user = useUserStore((state) => state.user);
    const convert = useConversionHelpers();
    const [showDeleteBikeModal, setShowDeleteBikeModal] = useState(false);

    const [deleteBike] = useDeleteBikeMutation({
        variables: {
            bikeId: bike?.bikeId ?? "",
            userId: bike?.userId ?? "",
        },
        onCompleted: (data) => {
            console.log("Bike deleted successfully", data);
        },
        onError: (error) => {
            console.error("Error deleting bike", error);
        },
    });

    async function handleDeleteBike() {
        try {
            if (!bike.bikeId) {
                console.error("No bike ID provided");
            }
            await deleteBike({
                variables: {
                    bikeId: bike!.bikeId,
                    userId: user?.id ?? '',
                }
            });
            setShowDeleteBikeModal(false);
        } catch (e) {
            console.error("Error deleting equipment", e);
        }
    }

    return (
        <>
            <Card>
                {showDeleteBikeModal && (
                    <DeleteBikeModal
                        show={showDeleteBikeModal}
                        bike={bike}
                        onClose={() => setShowDeleteBikeModal(false)}
                        handleDeleteBike={async () => {
                            handleDeleteBike();
                        }}
                    />
                )}
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={4} className="d-flex align-items-center">
                                {bike?.name ?? "Bike Not Found"}
                                <Button onClick={() => setShowDeleteBikeModal(true)} variant="link" className="ms-auto">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </Button>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{bike?.brandName ?? "No data"} {bike?.modelName} - {convert.ConvertMetersToMiles(bike?.metersLogged ?? 0)} miles</Card.Subtitle>
                    <Card.Text>
                        <Row>
                            {bike?.description}
                        </Row>
                    </Card.Text>
                    <EquipmentList
                        equipment={_.compact(bike?.equipment) ?? []} bike={bike} />
                </Card.Body>
            </Card>
        </>
    )
}

export default BikeDetailsCard