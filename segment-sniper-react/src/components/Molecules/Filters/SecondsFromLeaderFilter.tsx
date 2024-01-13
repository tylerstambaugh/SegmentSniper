import { FormGroup, Row, Col, FormLabel, Form } from "react-bootstrap";
import {} from "react-router-dom";

export interface SecondsFromLeaderProps {
  leaderTypeQom: boolean;
  secondsFromLeader: number | undefined;
  onChange: (value: number) => void;
}

const SecondsFromLeaderFilter = ({
  leaderTypeQom: leaderTypeQom,
  secondsFromLeader,
  onChange,
}: SecondsFromLeaderProps) => {
  return (
    <FormGroup>
      <Row className="pb-2">
        <Col xs={8} className="text-start">
          <FormLabel className=" snipe-option-label">
            Seconds From {leaderTypeQom ? `QOM` : "KOM"}:
          </FormLabel>
        </Col>
        <Col className="">
          <Form.Control
            type="number"
            value={secondsFromLeader || ""}
            onBlur={(e) => onChange(Number(e.target.value))}
            onChange={(e) => onChange(Number(e.target.value))}
            pattern="[0-9]*"
            style={{
              width: "80%",
              display: "inline-block",
              marginRight: "25px",
            }}
          />
        </Col>
      </Row>
    </FormGroup>
  );
};

export default SecondsFromLeaderFilter;
