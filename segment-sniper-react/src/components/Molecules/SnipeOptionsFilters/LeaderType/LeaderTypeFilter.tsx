import { Row, Col, Form } from "react-bootstrap";
import styles from "./LeaderTypeFilter.module.scss";

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
      <p className={styles.label}>Use QOM:</p>
      <div className="text-end pb-0 mb-0">
        <Form.Check
          type="switch"
          checked={leaderTypeQom}
          id="QomSwitch"
          onChange={(e) => {
            onChange(e.target.checked);
          }}
          className={styles.switch}
        />
      </div>
    </Col>
  );
};

export default LeaderTypeFilter;
