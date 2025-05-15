import { Button, Col, Modal, Row } from "react-bootstrap";


export type ImportBikesModalProps = {
    show: boolean;
    onClose: () => void;
};

const ImportBikesModal = ({ show, onClose }: ImportBikesModalProps) => {

    const handleImport = () => {
        //do the stuff
    }


    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Import Bikes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="mb-3">
                        This will query your strava activities for the last year and add any bikes you've ridden to your garage.
                    </Row>
                    <Row className="mb-3">
                        <Button variant="primary" onClick={handleImport}>
                            Import
                        </Button>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default ImportBikesModal;