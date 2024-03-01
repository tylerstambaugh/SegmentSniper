import { Row, Col, Form } from "react-bootstrap";
import Slider from "../../../Atoms/Slider/Slider";
import { useState } from "react";
import styles from "./PercentageFromLeaderFilter.module.scss";

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
          <p className={`${styles.label} mb-0`}>
            % From {leaderTypeQom ? `QOM` : "KOM"}:
          </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col xs={8} md={9} className="pt-1">
          <Slider
            onChange={onChange}
            value={percentageFromLeader || undefined}
            min={0}
            max={100}
            disabled={false}
          />
        </Col>
        <Col className="text-end">
          <Form.Control
            type="text"
            className="mb-2"
            inputMode="numeric"
            value={percentageFromLeader || ""}
            style={{
              //width: "65%",
              display: "inline-block",
              textAlign: "right",
            }}
            onBlur={(e) => onChange(Number(e.target.value))}
            onChange={(e) => onChange(Number(e.target.value))}
            pattern="[0-9]*"
          />
        </Col>
      </Row>
    </Col>
  );
};

export default PercentageFromLeaderFilter;
