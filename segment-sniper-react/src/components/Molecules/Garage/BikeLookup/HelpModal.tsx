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
                    <Modal.Title>Activity Search</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.helpModalBody}>
                    <Col className="px-2">
                        <Row>
                            <p className={styles.helpModalSubTitle}>
                                Searching can be performed by activity name, dates, or name
                                and dates.
                            </p>
                            <ul>
                                <li className="pb-1">
                                    Searching by name alone will query the last 6 months of
                                    activities for activities that contain the search key(s).
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