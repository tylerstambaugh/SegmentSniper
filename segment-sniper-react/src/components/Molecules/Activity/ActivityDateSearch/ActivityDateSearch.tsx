import { FormikErrors } from "formik";
import { DateTime } from "luxon";

import { Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { ActivityListSearchForm } from "../../../Organisms/ActivityListLookupForm";

type Props = {
  startDate: DateTime | null;
  endDate: DateTime | null;
  onChange: (dateRange: {
    startDate: DateTime | null;
    endDate: DateTime | null;
  }) => void;
  errors: FormikErrors<ActivityListSearchForm>;
};

const ActivityDateSearch = ({
  startDate,
  endDate,
  onChange,
  errors,
}: Props) => {
  return (
    <Row>
      <Col md={6} className="mb-2">
        <Form.Group className="" controlId="startDate">
          <FloatingLabel
            className="pt-1"
            label="Start Date"
            controlId="startDateLabel"
          >
            <Form.Control
              type="date"
              value={startDate?.toISODate() ?? ""}
              onChange={(e) => {
                const newStartDate = DateTime.fromFormat(
                  e.target.value,
                  "yyyy-MM-dd"
                );
                onChange({
                  startDate: newStartDate,
                  endDate: endDate,
                });
              }}
              isInvalid={!!errors.startDate}
              className="pb-0"
            />
            <Form.Control.Feedback type="invalid">
              {errors.startDate}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="" controlId="endDate">
          <FloatingLabel
            className="pt-1"
            label="End Date"
            controlId="endDateLabel"
          >
            <Form.Control
              type="date"
              value={endDate?.toISODate() ?? ""}
              onChange={(e) => {
                const newEndDate = DateTime.fromFormat(
                  e.target.value,
                  "yyyy-MM-dd"
                );
                onChange({
                  startDate: startDate,
                  endDate: newEndDate,
                });
              }}
              isInvalid={!!errors.endDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.endDate}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ActivityDateSearch;