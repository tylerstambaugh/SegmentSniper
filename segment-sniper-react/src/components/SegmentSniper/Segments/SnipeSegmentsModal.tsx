import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { SnipeSegmentsRequest } from "../../../services/Api/Segment/postSnipeSegmentsList";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../enums/AppRoutes";
import useActivityListStore from "../../../stores/useActivityListStore";
import { useSnipeSegments } from "../../../hooks/Api/Segments/useSnipeSegments";
export interface SnipeSegmentFunctionProps {
  activityId?: string;
  secondsOff?: number;
  percentageOff?: number;
  useQom: boolean;
}
export interface ShowSnipeSegmentsModalProps {
  show: boolean;
  handleClose: () => void;
}

function ShowSnipeSegmentsModal(props: ShowSnipeSegmentsModalProps) {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [selectedActivityId, setSelectedActivityId, resetActivityList] =
    useActivityListStore((state) => [
      state.selectedActivityId,
      state.setSelectedActivityId,
      state.resetActivityList,
    ]);

  const snipeSegments = useSnipeSegments();

  async function handleSnipeSegments(request: SnipeSegmentsRequest) {
    request.activityId = selectedActivityId!;
    await snipeSegments.mutateAsync(request);
    navigate(AppRoutes.SnipedSegments);
  }
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
    onSubmit: async (values: SnipeSegmentsParametersForm) => {
      const snipeProps: SnipeSegmentsRequest = {
        secondsOff: values.secondsFromLeader,
        percentageOff: values.percentageFromLeader,
        useQom: values.useQom,
      };
      await handleSnipeSegments(snipeProps);
      props.handleClose();
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
            event.preventDefault();
            setValidated(true);
            formik.handleSubmit(event);
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
            {snipeSegments.isLoading ? (
              <Button type="submit" variant="primary" style={{ width: "75px" }}>
                <Spinner
                  as="span"
                  variant="light"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  animation="border"
                />
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Snipe!
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ShowSnipeSegmentsModal;
