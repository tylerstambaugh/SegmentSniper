import { Row, Col, Form } from "react-bootstrap";
import Slider from "../../Atoms/Slider/Slider";
import { useState } from "react";

export interface PercentageFromLeaderProps {
  useQom: boolean;
  percentageFromLeader: number | undefined;
  onChange: (value: number) => void;
}

const PercentageFromLeaderFilter = ({
  useQom,
  percentageFromLeader,
  onChange,
}: PercentageFromLeaderProps) => {
  return (
    <Row>
      <Col xs={12} className=" text-start snipe-option-label">
        % From {useQom ? `QOM` : "KOM"}:
      </Col>
      <Col xs={8} className="pt-2">
        <Slider
          onChange={onChange}
          value={percentageFromLeader || undefined}
          min={0}
          max={100}
          disabled={false}
        />
      </Col>
      <Col xs={4} className="pb-2">
        <Form.Control
          type="number"
          value={percentageFromLeader || ""}
          style={{
            width: "80%",
            display: "inline-block",
            marginRight: "5px",
          }}
          onBlur={(e) => onChange(Number(e.target.value))}
          onChange={(e) => onChange(Number(e.target.value))}
          pattern="[0-9]*"
        />
        <span style={{ display: "inline-block" }}>%</span>
      </Col>
    </Row>
  );
};

export default PercentageFromLeaderFilter;
