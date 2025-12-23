import { FormikErrors } from 'formik';
import { DateTime } from 'luxon';
import { RangeKeyDict, Range, DateRange } from 'react-date-range';
import { Row, Form } from 'react-bootstrap';
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

const ActivityDateSearch = ({
  startDate,
  endDate,
  onChange,
  errors,
}: Props) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: startDate ? startDate.toJSDate() : addDays(new Date(), -7),
      endDate: endDate ? endDate.toJSDate() : new Date(),
      key: 'selection',
    },
  ]);

  const isInvalid = Boolean(errors.startDate || errors.endDate);

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
      <Row>
        <Form.Group>
          <div className={`${styles.wrapper} ${isInvalid ? 'is-invalid' : ''}`}>
            <DateRange
              onChange={(item) => {
                handleChange(item);
                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={state}
              editableDateInputs
            />
          </div>

          {isInvalid && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.startDate || errors.endDate}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
    </>
  );
};

export default ActivityDateSearch;
