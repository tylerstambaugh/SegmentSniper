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
    <Row>
      <Col className="text-start snipe-option-label">
        <p>Use QOM:</p>
      </Col>
      <Col className="text-end">
        <Form.Check
          type="switch"
          checked={leaderTypeQom}
          id="QomSwitch"
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
      </Col>
    </Row>
  );
};

export default LeaderTypeFilter;
