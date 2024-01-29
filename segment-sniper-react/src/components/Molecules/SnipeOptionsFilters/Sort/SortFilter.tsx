import { Row, Col, FormGroup, FormSelect, FormLabel } from "react-bootstrap";
import styles from "./SortFilter.module.scss";

export interface SortFilterProps {
  sortBy: string;
  onChange: (value: string) => void;
}

const SortFilter = ({ sortBy, onChange }: SortFilterProps) => {
  return (
    <Row>
      <Col>
        <FormGroup controlId="sortControl" className={styles.form}>
          <FormLabel className={styles.label}>Sort By</FormLabel>
          <FormSelect
            value={sortBy}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className={styles.select}
          >
            <option value="date">Date</option>
            <option value="longestDistance">Longest Distance</option>
            <option value="shortestDistance">Shortest Distance</option>
            <option value="shortestTime">Shortest Time</option>
            <option value="longestTime">Longest Time</option>
          </FormSelect>
        </FormGroup>
      </Col>
    </Row>
  );
};

export default SortFilter;
