import { Row, Col, FormGroup, FormSelect } from "react-bootstrap";
import "../../../App.css";

export interface SortFilterProps {
  sortBy: string;
  onChange: (value: string) => void;
}

const SortFilter = ({ sortBy, onChange }: SortFilterProps) => {
  return (
    <Row>
      <Col className="text-start snipe-option-label">
        <p>Sort By:</p>
      </Col>
      <Col>
        <FormGroup controlId="sortControl" className="text-end">
          <FormSelect
            value={sortBy}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            style={{
              padding: "0px 2px",
              textAlign: "start",
            }}
            className="text-end snipe-option-heading-select"
          >
            <option>Sort By</option>
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
