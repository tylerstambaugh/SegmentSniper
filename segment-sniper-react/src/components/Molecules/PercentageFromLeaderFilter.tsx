import { Row, Col, Form } from "react-bootstrap";
import Slider from "../Atoms/Slider/Slider";
import { useState } from "react";

export interface PercentageFromLeaderProps {
  useQom: boolean;
  percentageFromLeader: number | undefined;
  handlePercentageFromLeaderFilterChange: (
    percentageFromLeader: number
  ) => void;
}

const PercentageFromLeaderFilter = (props: PercentageFromLeaderProps) => {
  return (
    <Row>
      <Col xs={12} className=" text-start snipe-option-label">
        % From {props.useQom ? `QOM` : "KOM"}:
      </Col>
      <Col xs={8} className="pt-2">
        <Slider
          onChange={(value) =>
            props.handlePercentageFromLeaderFilterChange(value)
          }
          value={props.percentageFromLeader || undefined}
          min={0}
          max={100}
          disabled={false}
        />
      </Col>
      <Col xs={4} className="pb-2">
        <Form.Control
          type="number"
          value={props.percentageFromLeader || ""}
          style={{
            width: "80%",
            display: "inline-block",
            marginRight: "5px",
          }}
          onBlur={(e) =>
            props.handlePercentageFromLeaderFilterChange(Number(e.target.value))
          }
          onChange={(e) =>
            props.handlePercentageFromLeaderFilterChange(Number(e.target.value))
          }
          pattern="[0-9]*"
        />
        <span style={{ display: "inline-block" }}>%</span>
      </Col>
    </Row>
  );
};

export default PercentageFromLeaderFilter;
