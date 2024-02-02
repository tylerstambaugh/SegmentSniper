import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import * as yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";

import { ActivityTypes } from "../../../enums/ActivityTypes";
import { useHandleActivitySearch } from "../../../hooks/Api/Activity/useHandleActivitySearch";
import toast from "react-hot-toast";
import useSegmentEffortsListStore from "../../../stores/useSegmentEffortsListStore";
import useSnipeSegmentsListStore from "../../../stores/useSnipeSegmentsListStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../enums/AppRoutes";
import useActivityListStore from "../../../stores/useActivityListStore";
import ActivityNameSearchInput from "../../Molecules/Activity/ActivityNameSearch/ActivityNameSearchInput";
import ActivityDateSearch from "../../Molecules/Activity/ActivityDateSearch/ActivityDateSearch";
import ActivityTypeDropdown from "../../Molecules/Activity/ActivityTypeDropdown/ActivityTypeDropdown";
import styles from "./ActivityListLookupForm.module.scss";
import { ActivityListLookupRequest } from "../../../services/Api/Activity/getActivityList";
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
    activityName: yup
      .string()
      .nullable()
      .when("startDate", {
        is: () => "startDate" === null,
        then: (schema) => schema.required("Must provide name or dates"),
      }),
    startDate: yup
      .date()
      .nullable()
      .when("activityName", {
        is: () => "activityName" === null,
        then: (schema) => schema.required("Must provide name or dates"),
      }),
    endDate: yup
      .date()
      .nullable()
      .when("startDate", ([startDate], schema) => {
        const luxonStartDate = DateTime.fromJSDate(startDate);
        return startDate !== null && luxonStartDate.isValid
          ? schema
              .min(luxonStartDate.toISODate(), "End must be after start")
              .required("End date required when start date specified")
          : schema;
      })
      .typeError("Enter a valid date"),
  });

  // dateOfReturn: date()
  // .required('Please enter a date of return')
  // .when('dateOfDeparture', ([dateOfDeparture], schema) => {
  //   const luxonDepartureDate = DateTime.fromJSDate(dateOfDeparture);
  //   return dateOfDeparture !== null && luxonDepartureDate.isValid
  //     ? schema.min(
  //         luxonDepartureDate.toISODate(),
  //         `Return date cannot be before departure date`,
  //       )
  //     : schema;
  // })
  // .typeError('Please enter a valid date')
  // .required('Please enter a date of return'),

  const initialValues = {
    activityName: null,
    activityType: "Ride",
    startDate: null,
    endDate: null,
  };

  async function handleSearch(request: ActivityListLookupRequest) {
    resetSegmentsList();
    resetSnipedSegments();
    setSelectedActivityId("");
    await handleActivitySearch.mutateAsync(request);
    if (!handleActivitySearch.isError) {
      navigate(`/${AppRoutes.ActivitySearchResults}`);
    }
  }

  useEffect(() => {
    if (handleActivitySearch.error !== null)
      toast.error(`${handleActivitySearch.error}`);
  }, [handleActivitySearch.error]);

  const formik = useFormik<ActivityListSearchForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: ActivityListSearchForm) => {
      setValidated(true);
      console.log("values", values);

      const searchProps: ActivityListLookupRequest = {
        activityName: values.activityName ?? null,
        startDate: values.startDate ?? null,
        endDate: values.endDate ?? null,
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

  useEffect(() => {
    console.log("formik values", formik.values);
  }, [formik.values]);

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} xs={10} className="pt-2 text-center justify-content-center">
          <Card className="shadow">
            <Card.Body>
              <Row className="text-center">
                <h3>Activity Lookup</h3>
              </Row>
              <Form
                name="activityLookupForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  setValidated(true);
                  formik.handleSubmit(event);
                }}
              >
                <Row className="justify-content-center">
                  <Col md={6}>
                    <ActivityNameSearchInput
                      activityName={formik.values.activityName ?? ""}
                      onChange={(name: string) => {
                        formik.setFieldValue("activityName", name);
                      }}
                      errors={formik.errors}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-around">
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
                </Row>
                <hr className="hr-75" />
                <Row className="justify-content-around">
                  <ActivityTypeDropdown
                    onChange={(selection: string) => {
                      formik.setFieldValue("activityType", selection);
                    }}
                    selection={formik.values.activityType ?? ActivityTypes.Ride}
                    errors={formik.errors}
                  />
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
                          disabled={handleActivitySearch.isLoading}
                        >
                          Search
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ActivityListLookupForm;
