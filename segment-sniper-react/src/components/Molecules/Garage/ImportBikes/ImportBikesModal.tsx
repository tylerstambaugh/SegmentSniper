import { Button, Col, Modal, Row } from "react-bootstrap";
import useUserStore from "../../../../stores/useUserStore";
import { useImportGarage } from "./GraphQl/useImportGarage";
import toast from "react-hot-toast";


export type ImportBikesModalProps = {
    show: boolean;
    onClose: () => void;
};

const ImportBikesModal = ({ show, onClose }: ImportBikesModalProps) => {
    const userId = useUserStore((state) => state.user?.id);
    const [importGarage] = useImportGarage({
        variables: {
            userId: userId ?? "",
        },
        onCompleted: () => {
            toast.success("Bikes imported successfully!");
            onClose();
        },
        onError: (error) => {
            toast.error(`Error importing bikes: ${error.message}`);
        },
    });


    const handleImport = () => {
        if (!userId) {
            console.error("User ID is not available");
            return;
        }
        importGarage({
            variables: {
                userId: userId,
            },
        });

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
                            <Button variant="primary" onClick={handleImport}>
                                Import
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default ImportBikesModal;