import { FormikErrors } from 'formik';
import { DateTime } from 'luxon';
import {
  DateRangePicker,
  RangeKeyDict,
  Range,
  DateRange,
  Calendar,
} from 'react-date-range';
import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import { ActivityListSearchForm } from '../../../Organisms/ActivityListLookupForm/ActivityListLookupForm';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import styles from './ActivityDateSearchInput.module.scss';

type Props = {
  startDate: DateTime | null;
  endDate: DateTime | null;
  onChange: (dateRange: {
    startDate: DateTime | null;
    endDate: DateTime | null;
  }) => void;
  errors: FormikErrors<ActivityListSearchForm>;
};

//replace this with better calendar picker
const ActivityDateSearch = ({
  startDate,
  endDate,
  onChange,
  errors,
}: Props) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleChange = (item: RangeKeyDict) => {
    onChange({
      startDate: item.selection.startDate
        ? DateTime.fromJSDate(item.selection.startDate)
        : null,
      endDate: item.selection.endDate
        ? DateTime.fromJSDate(item.selection.endDate)
        : null,
    });
  };

  return (
    <>
      {/* <Row>
        <Col md={6} className="mb-2">
          <Form.Group className="" controlId="startDate">
            <FloatingLabel
              className="pt-1"
              label="Start Date"
              controlId="startDateLabel"
            >
              <Form.Control
                type="date"
                value={startDate?.toISODate() ?? ''}
                max={new Date(new Date().setDate(new Date().getDate() - 1))
                  .toISOString()
                  .slice(0, 10)}
                onChange={(e) => {
                  const newStartDate = DateTime.fromFormat(
                    e.target.value,
                    'yyyy-MM-dd',
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
          <Form.Group className="pb-2" controlId="endDate">
            <FloatingLabel
              className="pt-1"
              label="End Date"
              controlId="endDateLabel"
            >
              <Form.Control
                type="date"
                value={endDate?.toISODate() ?? ''}
                max={new Date().toLocaleDateString('en-CA')}
                onChange={(e) => {
                  const newEndDate = DateTime.fromFormat(
                    e.target.value,
                    'yyyy-MM-dd',
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
      </Row> */}
      <Row>
        <Col md={6}>
          <div className={styles.wrapper}>
            <DateRange
              onChange={(item) => {
                handleChange(item);
                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={state}
              editableDateInputs={true}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ActivityDateSearch;
