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
  Modal,
} from "react-bootstrap";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActivityTypes } from "../../../enums/ActivityTypes";
import { useHandleActivitySearch } from "../../../hooks/Api/Activity/useHandleActivitySearch";
import toast from "react-hot-toast";
import useSegmentEffortsListStore from "../../../stores/useSegmentEffortsListStore";
import useSnipeSegmentsListStore from "../../../stores/useSnipeSegmentsListStore";
import { Link, useNavigate } from "react-router-dom";
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
  const [helpModalShow, setHelpModalShow] = useState(false);
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

  const validationSchema = yup
    .object({
      activityName: yup
        .string()
        .nullable()
        .when(["startDate", "endDate"], ([startDate, endDate], schema) => {
          return startDate === null && endDate === null
            ? schema.required("Must provide name or dates")
            : schema;
        }),
      startDate: yup
        .date()
        .nullable()
        .max(new Date(), "Date must be in the past")
        .when(["endDate"], {
          is: (endDate: DateTime) => endDate !== null,
          then: (schema) => schema.required("Start date required"),
        })
        .typeError("Enter a valid date"),
      endDate: yup
        .date()
        .nullable()
        .max(new Date(), "Date must be in the past")
        .typeError("Enter a valid date"),
    })
    .test(
      "endDateBeforeStartDate",
      "End Date must be before Start Date",
      function (values) {
        if (
          values.startDate &&
          values.startDate !== undefined &&
          values.endDate &&
          values.endDate !== undefined
        ) {
          return values.endDate < values.startDate;
        }
        return true;
      }
    );

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
      console.log("errors", formik.errors);

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

  const handleHelpModalClose = () => setHelpModalShow(false);
  const handleHelpModalShow = () => setHelpModalShow(true);

  useEffect(() => {
    console.log("formik values", formik.values);
  }, [formik.values]);

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} xs={10} className="pt-2 text-center justify-content-center">
          <Card className="shadow">
            <Card.Body>
              <Col className="d-flex text-center justify-content-center">
                <h3 className="pe-2">Activity Lookup</h3>

                <Link onClick={handleHelpModalShow} to="">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    size="sm"
                    style={{
                      color: "#ffca14",
                      paddingTop: ".6rem",
                      font: "black",
                    }}
                  />
                </Link>
              </Col>
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
                <Row className="justify-content-around mb-0">
                  <p className="mb-0">Search by date range:</p>
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
      <Row>
        <Modal
          show={helpModalShow}
          onHide={handleHelpModalClose}
          className={styles.helpModal}
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
                  <li className="pb-1">
                    Searching by dates alone will return the first 180
                    activities within the date range provided.
                  </li>
                  <li className="pb-1">
                    Searching by name and dates will return the first 180
                    activities within the date range with titles that contain
                    the search key(s)
                  </li>
                  <li>
                    All matching activities will be filtered by the selection in
                    the Activity Type dropdown.
                  </li>
                </ul>
              </Row>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHelpModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}

export default ActivityListLookupForm;
