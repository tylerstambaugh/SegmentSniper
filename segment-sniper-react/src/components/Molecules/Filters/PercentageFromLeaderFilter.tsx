import { Row, Col, Form } from "react-bootstrap";
import Slider from "../../Atoms/Slider/Slider";
import { useState } from "react";

export interface PercentageFromLeaderProps {
  leaderTypeQom: boolean;
  percentageFromLeader: number | undefined;
  onChange: (value: number) => void;
}

const PercentageFromLeaderFilter = ({
  leaderTypeQom: leaderTypeQom,
  percentageFromLeader,
  onChange,
}: PercentageFromLeaderProps) => {
  return (
    <Col>
      <Row>
        <Col
          xs={12}
          className="d-flex justify-content-start snipe-option-label"
        >
          <p className="mb-0">% From {leaderTypeQom ? `QOM` : "KOM"}:</p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col xs={8} md={10}>
          <Slider
            onChange={onChange}
            value={percentageFromLeader || undefined}
            min={0}
            max={100}
            disabled={false}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            value={percentageFromLeader || ""}
            style={{
              width: "65%",
              display: "inline-block",
              padding: "2px",
              marginRight: "1px",
              textAlign: "end",
            }}
            onBlur={(e) => onChange(Number(e.target.value))}
            onChange={(e) => onChange(Number(e.target.value))}
            pattern="[0-9]*"
          />
          <span style={{ display: "inline-block" }}>%</span>
        </Col>
      </Row>
    </Col>
  );
};

export default PercentageFromLeaderFilter;
