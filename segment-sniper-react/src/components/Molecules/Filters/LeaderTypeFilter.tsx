import { Row, Col, Form } from "react-bootstrap";

export interface LeaderTypeFilterProps {
  leaderTypeQom: boolean;
  onChange: (value: boolean) => void;
}

const LeaderTypeFilter = ({
  leaderTypeQom,
  onChange,
}: LeaderTypeFilterProps) => {
  return (
    <Col className="d-flex justify-content-between">
      <p className="snipe-option-label">Use QOM:</p>
      <p className="mr-4 pr-4">
        <Form.Check
          type="switch"
          checked={leaderTypeQom}
          id="QomSwitch"
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
      </p>
    </Col>
  );
};

export default LeaderTypeFilter;
