import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import * as yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";

import { ActivityTypes } from "../../enums/ActivityTypes";
import {
  ActivitySearchRequest,
  useHandleActivitySearch,
} from "../../hooks/Api/Activity/useHandleActivitySearch";
import toast from "react-hot-toast";
import useSegmentEffortsListStore from "../../stores/useSegmentEffortsListStore";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import useActivityListStore from "../../stores/useActivityListStore";

function ActivityListLookupForm() {
  const [validated, setValidated] = useState(false);
  const handleActivitySearch = useHandleActivitySearch();
  const navigate = useNavigate();
  const resetSegmentsList = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );
  const resetSnipedSegments = useSnipeSegmentsListStore(
    (state) => state.resetSnipedSegmentsList
  );
  const setSelectedActivityId = useActivityListStore(
    (state) => state.setSelectedActivityId
  );
  interface ActivityListLookupForm {
    startDate?: DateTime | null;
    endDate?: DateTime | null;
    activityType?: string | null;
  }

  const validationSchema = yup.object({
    startDate: yup.date().when([], {
      is: () => "activityId" !== null,
      then: (schema) => schema.nullable(),
    }),
    endDate: yup
      .date()
      .nullable()
      .when("startDate", (startDate, schema) => {
        return startDate !== null
          ? schema
              .min(startDate, "End date must be after start date")
              .required("End date is required")
          : schema;
      }),
  });

  const initialValues = {
    activityType: "Ride",
    startDate: null,
    endDate: null,
  };

  async function handleSearch(request: ActivitySearchRequest) {
    resetSegmentsList();
    resetSnipedSegments();
    setSelectedActivityId("");
    await handleActivitySearch.mutateAsync(request);
    navigate(`/${AppRoutes.ActivitySearchResults}`);
  }

  useEffect(() => {
    if (handleActivitySearch.error !== null)
      toast.error(`Activity search error: ${handleActivitySearch.error}`);
  }, [handleActivitySearch.error]);

  const formik = useFormik<ActivityListLookupForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: ActivityListLookupForm) => {
      setValidated(true);
      const searchProps: ActivitySearchRequest = {
        startDate: values.startDate,
        endDate: values.endDate,
        activityType: values.activityType as unknown as ActivityTypes,
      };
      handleSearch(searchProps);
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  const handleFormReset = () => {
    formik.resetForm({
      values: {
        activityType: "Ride",
        startDate: null,
        endDate: null,
      },
    });
    formik.setErrors({});
    formik.setFieldValue("startDate", null);
    formik.setFieldValue("endDate", null);
    setValidated(false);
  };

  const disableSearch = (): boolean => {
    return formik.values.endDate === null || formik.values.startDate === null;
  };

  return (
    <>
      <Container className="pt-2 mb-1 mt-2 shadow bg-light text-dark border rounded w-50">
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
            <p>Search by date range:</p>
            <Row className=" justify-content-center mb-3">
              <Col lg={4} className="mb-2">
                <Form.Group className="" controlId="startDate">
                  <FloatingLabel label="Start Date" controlId="startDateLabel">
                    <Form.Control
                      type="date"
                      value={formik.values.startDate?.toString() ?? ""}
                      onChange={(e) => {
                        formik.setFieldValue("startDate", e.target.value);
                      }}
                      isInvalid={!!formik.errors.startDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.startDate}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group className="" controlId="endDate">
                  <FloatingLabel label="End Date" controlId="endDateLabel">
                    <Form.Control
                      type="date"
                      value={formik.values.endDate?.toString() ?? ""}
                      onChange={(e) => {
                        formik.setFieldValue("endDate", e.target.value);
                      }}
                      isInvalid={!!formik.errors.endDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.endDate}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <hr className="hr-75" />
            <Row>
              <Col>
                <Form.Group controlId="activityTypeRadios">
                  <Form.Label id="activityTypeRadioButtons" className="p-2">
                    Activity Type:
                  </Form.Label>
                  {Object.values(ActivityTypes).map((type) => (
                    <Form.Check
                      key={type}
                      type="radio"
                      inline
                      value={type}
                      name="activity-type-radio"
                      label={type}
                      id={`${type}-radio`}
                      checked={formik.values.activityType === type}
                      onChange={(e) => {
                        formik.setFieldValue("activityType", e.target.value);
                      }}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mb-2">
              <Row>
                <Col>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleFormReset();
                    }}
                    className="px-2"
                  >
                    Reset
                  </Button>
                </Col>
                <Col>
                  {handleActivitySearch.isLoading ? (
                    <Button
                      type="submit"
                      variant="secondary"
                      style={{ width: "75px" }}
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
                      disabled={
                        handleActivitySearch.isLoading || disableSearch()
                      }
                    >
                      Search
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Container>
    </>
  );
}

export default ActivityListLookupForm;
