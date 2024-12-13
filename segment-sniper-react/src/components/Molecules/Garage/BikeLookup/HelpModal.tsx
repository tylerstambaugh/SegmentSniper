import { Button, Col, Modal, Row } from "react-bootstrap"
import styles from "./BikeLookup.module.scss"

export type BikeLookupHelpModalProps = {
    show: boolean,
    handleClose: () => void,
}

export const BikeLookupHelpModal = (props: BikeLookupHelpModalProps) => {


    return (


        <Row>
            <Modal
                show={props.show}
                onHide={props.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bike Id</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.helpModalBody}>
                    <Col className="px-2">
                        <Row>
                            <p className={styles.helpModalSubTitle}>
                                Looking up a bike by it's Strava Id
                            </p>
                            <ul>
                                <li className="pb-1">
                                    You can find the ID of your bike on the Strava Gear page.
                                </li>
                            </ul>
                        </Row>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    )
}