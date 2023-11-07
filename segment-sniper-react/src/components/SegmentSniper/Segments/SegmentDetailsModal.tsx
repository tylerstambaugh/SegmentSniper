import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { SegmentDetails } from "../../../models/Segment/SegmentDetails";

export interface SegmentDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  segment?: SegmentDetails;
}

function SegmentDetailsModal(props: SegmentDetailsModalProps) {
  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Segment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SegmentDetailsModal;
