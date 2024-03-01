import { FormGroup, Row, Col, FormLabel, Form } from "react-bootstrap";
import {} from "react-router-dom";
import styles from "./SecondsFromLeaderFilter.module.scss";

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
        <Col xs={8} md={9} className="text-start">
          <FormLabel className={styles.label}>
            Seconds From {leaderTypeQom ? `QOM` : "KOM"}:
          </FormLabel>
        </Col>
        <Col className="text-end">
          <Form.Control
            type="text"
            inputMode="numeric"
            value={secondsFromLeader || ""}
            onBlur={(e) => onChange(Number(e.target.value))}
            onChange={(e) => onChange(Number(e.target.value))}
            pattern="[0-9]*"
            style={{
              //width: "65%",
              display: "inline-block",
              textAlign: "center",
            }}
          />
        </Col>
      </Row>
    </FormGroup>
  );
};

export default SecondsFromLeaderFilter;
