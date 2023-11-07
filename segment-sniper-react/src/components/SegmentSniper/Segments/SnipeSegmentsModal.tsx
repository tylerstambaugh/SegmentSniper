import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { SnipeSegmentsRequest } from "../../../services/Api/Segment/postSnipeSegmentsList";
export interface SnipeSegmentFunctionProps {
  activityId?: string;
  secondsOff?: number;
  percentageOff?: number;
  useQom: boolean;
}
export interface ShowSnipeSegmentsModalProps {
  show: boolean;
  handleClose: () => void;
  handleSnipeSegments: (request: SnipeSegmentsRequest) => void;
}

function ShowSnipeSegmentsModal(props: ShowSnipeSegmentsModalProps) {
  const [validated, setValidated] = useState(false);
  interface SnipeSegmentsParametersForm {
    secondsFromLeader?: number;
    percentageFromLeader?: number;
    useQom: boolean;
  }

  const validationSchema = yup.object().shape({
    secondsFromLeader: yup
      .number()
      .min(2, "Number must be greater than 2")
      .nullable(),
    percentageFromLeader: yup
      .number()
      .min(2, "Number must be greater than 2")
      .nullable(),
    useQom: yup.boolean().required("Select QOM or KOM"),
  });

  const formik = useFormik<SnipeSegmentsParametersForm>({
    initialValues: {
      secondsFromLeader: undefined,
      percentageFromLeader: undefined,
      useQom: false,
    },
    onSubmit: (values: SnipeSegmentsParametersForm) => {
      console.log(`segment snipe form props: ${values}`);
      //setValidated(true);
      const snipeProps: SnipeSegmentsRequest = {
        secondsOff: values.secondsFromLeader,
        percentageOff: values.percentageFromLeader,
        useQom: values.useQom,
      };
      props.handleSnipeSegments(snipeProps);
    },
    validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Segment Sniping Parameters</Modal.Title>
        </Modal.Header>
        <Form
          name="SnipeSegmentsParametersForm"
          onSubmit={(event) => {
            console.log("handling submission");
            event.preventDefault();
            setValidated(true);
            console.log(`formik isValid = ${formik.isValid}`);
            console.log(`formik status = ${formik.status}`);
            formik.handleSubmit(event);
            props.handleClose();
          }}
        >
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="secondsFromLeader">
                    <Row>
                      <Col md={6} className={"pt-2 pb-0 "}>
                        <Form.Label>Seconds From Leader:</Form.Label>
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          type="number"
                          name="secondsFromLeader"
                          value={formik.values.secondsFromLeader || ""}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "secondsFromLeader",
                              e.target.value
                            );
                          }}
                          isInvalid={Boolean(formik.errors.secondsFromLeader)}
                        />
                      </Col>
                    </Row>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.secondsFromLeader}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col
                  md={5}
                  className="pt-2 d-flex align-items-center justify-content-center"
                >
                  <p>OR</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="percentageFromLeader" className="pb-0">
                    <Row>
                      <Col md={6} className={"pt-2 pb-5"}>
                        <Form.Label>Percentage From Leader:</Form.Label>
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          type="number"
                          name="percentageFromLeader"
                          value={formik.values.percentageFromLeader || ""}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "percentageFromLeader",
                              e.target.value
                            );
                          }}
                          isInvalid={Boolean(
                            formik.errors.percentageFromLeader
                          )}
                        />
                      </Col>
                    </Row>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.percentageFromLeader}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <p>Compare against QOM:</p>
                    </Col>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="QomSwitch"
                        onChange={(e) => {
                          formik.setFieldValue("UseQom", !e.target.checked);
                          console.log(formik.values);
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleClose()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Snipe!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ShowSnipeSegmentsModal;
