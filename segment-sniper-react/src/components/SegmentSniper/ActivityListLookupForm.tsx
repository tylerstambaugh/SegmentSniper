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
      <Container className="md-auto p-2 mb-1 col-8 bg-light text-dark border rounded">
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
              <Row className="md-auto p-2 mb-1">
                <div className="border rounded mb-1 p-2">
                  <Col lg={4}>
                    <Form.Group className="mb-3" controlId="activityId">
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
                  <Col>
                    <p>Activity Id for test = 9102798217</p>
                  </Col>
                </div>
              </Row>
              <div className="d-flex justify-content-end">
                <Row>
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
