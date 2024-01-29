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
    <Col className="d-flex justify-content-between pb-0">
      <p className="snipe-option-label pb-0 mb-0">Use QOM:</p>
      <p className="text-end pb-0 mb-0">
        <Form.Check
          type="switch"
          checked={leaderTypeQom}
          id="QomSwitch"
          onChange={(e) => {
            onChange(e.target.checked);
          }}
          style={{ zoom: 1.75 }}
        />
      </p>
    </Col>
  );
};

export default LeaderTypeFilter;
