import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ActivityTypeEnum from "../../enums/ActivityTypes";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";

import "../../App.css";

export interface ActivitySearchProps {
  activityId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  activityType?: ActivityTypeEnum | null;
}

function ActivityListLookupForm() {
  const [validated, setValidated] = useState(false);
  const [activityId, setActivityId] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const activityLoading: boolean = false;
  interface ActivityListLookupForm {
    activityId?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    activityType?: string | null;
  }

  const validationSchema = yup.object({});

  const initialValues = {
    activityId: null,
    activityType: "Ride",
    startDate: null,
    endDate: null,
  };

  const formik = useFormik<ActivityListLookupForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: ActivityListLookupForm) => {
      setValidated(true);
      const searchProps: ActivitySearchProps = {
        activityId: values.activityId ?? "",
        startDate: values.startDate,
        endDate: values.endDate,
        activityType: values.activityType as unknown as ActivityTypeEnum,
      };
      //handleSearch(searchProps);
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  const handleFormReset = () => {
    formik.resetForm({
      values: {
        activityId: null,
        activityType: "Ride",
        startDate: null,
        endDate: null,
      },
    });
    formik.setFieldValue("startDate", null);
    formik.setFieldValue("endDate", null);
    setValidated(false);
  };

  return (
    <>
      <Container className="d-flex flex-column col-6 md-auto pt-2 mb-1 mt-2 shadow bg-light text-dark border rounded">
        <Row>
          <Col className="text-center">
            <h3>Activity List Lookup</h3>
            <Form
              name="activityLookupForm"
              onSubmit={(event) => {
                event.preventDefault();
                setValidated(true);
                formik.handleSubmit(event);
              }}
            >
              <Row className="d-flex justify-content-center">
                <Col md={4} lg={3} className="p-1 ">
                  <Form.Group className="p-2" controlId="activityId">
                    <FloatingLabel
                      label={`Activity Id`}
                      controlId="activityIdLabel"
                    >
                      <Form.Control
                        type="number"
                        isInvalid={!!formik.errors.activityId}
                        onChange={(e) => {
                          formik.setFieldValue("activityId", e.target.value);
                          setActivityId(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col lg={5} className="d-flex justify-content-center">
                  <p className="pt-3">Test Id = 9102798217</p>
                </Col>
              </Row>
              <hr />
              <Row className=" justify-content-center mb-3">
                <Col md={4}>
                  <Form.Group className="" controlId="startDate">
                    <FloatingLabel
                      label="Start Date"
                      controlId="startDateLabel"
                    >
                      <Form.Control
                        type="date"
                        isInvalid={!!formik.errors.startDate}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="" controlId="endDate">
                    <FloatingLabel label="End Date" controlId="endDateLabel">
                      <Form.Control
                        type="date"
                        isInvalid={!!formik.errors.endDate}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mb-2">
                <Row>
                  <Col>
                    <Button
                      variant="secondary"
                      className={"me-1"}
                      onClick={(e) => {
                        handleFormReset();
                        console.log("form reset called");
                      }}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col>
                    {activityLoading ? (
                      <Button
                        type="submit"
                        variant="primary"
                        className={"rounded-button"}
                      >
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
                      <Button
                        type="submit"
                        variant="primary"
                        className={"me-1"}
                        disabled={activityLoading}
                      >
                        Search
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ActivityListLookupForm;
