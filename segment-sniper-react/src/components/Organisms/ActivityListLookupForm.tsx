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
import ActivityNameSearchInput from "../Molecules/Activity/ActivityNameSearch/ActivityNameSearchInput";
import ActivityDateSearch from "../Molecules/Activity/ActivityDateSearch/ActivityDateSearch";

export interface ActivityListSearchForm {
  activityName?: string | null;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
  activityType?: string | null;
}

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

  const validationSchema = yup.object({
    // name: yup.string().when([], {
    //   is: () => "startDate" === null,
    //   then: (schema) => schema.required("Must provide name or dates"),
    // }),
    // startDate: yup.date().when([], {
    //   is: () => "activityName" === null,
    //   then: (schema) => schema.required("Must provide name or dates"),
    // }),
    // endDate: yup
    //   .date()
    //   .nullable()
    //   .when("startDate", (startDate, schema) => {
    //     return startDate !== null
    //       ? schema
    //           .min(startDate, "End date must be after start date")
    //           .required("End date is required")
    //       : schema;
    //   }),
  });

  const initialValues = {
    activityName: null,
    activityType: "Ride",
    startDate: null,
    endDate: null,
  };

  async function handleSearch(request: ActivitySearchRequest) {
    resetSegmentsList();
    resetSnipedSegments();
    setSelectedActivityId("");
    await handleActivitySearch.mutateAsync(request);
    if (!handleActivitySearch.error) {
      navigate(`/${AppRoutes.ActivitySearchResults}`);
    }
  }

  useEffect(() => {
    if (handleActivitySearch.error !== null)
      toast.error(`Activity search error: ${handleActivitySearch.error}`);
  }, [handleActivitySearch.error]);

  const formik = useFormik<ActivityListSearchForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: ActivityListSearchForm) => {
      setValidated(true);
      console.log("values", values);

      const searchProps: ActivitySearchRequest = {
        name: values.activityName,
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
        activityName: null,
        activityType: "Ride",
        startDate: null,
        endDate: null,
      },
    });
    formik.setErrors({});
    formik.setFieldValue("activityName", null);
    formik.setFieldValue("startDate", null);
    formik.setFieldValue("endDate", null);
    setValidated(false);
  };

  const disableSearch = (): boolean => {
    return (
      !formik.values.activityName &&
      (!formik.values.endDate || !formik.values.startDate)
    );
  };

  return (
    <>
      <Container className="pt-2 mb-1 mt-2 shadow bg-light text-dark border rounded w-70">
        <Col className="text-center">
          <h3>Activity Lookup</h3>
          <Form
            name="activityLookupForm"
            onSubmit={(event) => {
              event.preventDefault();
              setValidated(true);
              formik.handleSubmit(event);
            }}
          >
            <p>Search by name:</p>
            <Row>
              <Col>
                <ActivityNameSearchInput
                  activityName={formik.values.activityName ?? ""}
                  onChange={(name: string) => {
                    formik.setFieldValue("activityName", name);
                  }}
                  errors={formik.errors}
                />
              </Col>
            </Row>
            <p>Search by date range:</p>
            <ActivityDateSearch
              startDate={formik.values.startDate ?? null}
              endDate={formik.values.endDate ?? null}
              onChange={(dateRange: {
                startDate: DateTime | null;
                endDate: DateTime | null;
              }) => {
                formik.setFieldValue("startDate", dateRange.startDate);
                formik.setFieldValue("endDate", dateRange.endDate);
              }}
              errors={formik.errors}
            />
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
