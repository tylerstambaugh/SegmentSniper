import React from "react";
import { toast } from "react-hot-toast";
import styles from "./CustomToast.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";

export type CustomToastProps = {
  message?: string | null;
  error?: string | null;
  type: "error" | "loading" | "success" | "default";
};

export function CustomToast({ message, type, error }: CustomToastProps) {
  let backgroundColor: string;
  let duration: number;
  if (type === "success") {
    backgroundColor = "green";
    duration = 3000;
  } else if (type === "error") {
    backgroundColor = `#fd2c60`;
    duration = 2000;
  } else if (type === "loading") {
    backgroundColor = "blue";
    duration = Infinity;
  } else {
    backgroundColor = "gray";
    duration = Infinity;
  }

  toast.custom(
    (t) => (
      <Col
        xs={12}
        md={4}
        className={styles.toastContainer}
        style={{ backgroundColor }}
      >
        <Row className="justify-content-around">
          <Col xs={10} className={styles.toastMessage}>
            {message}
          </Col>
          <Col xs={2} className="text-end">
            <Button
              onClick={() => toast.dismiss(t.id)}
              className={styles.toastButton}
              variant="secondary"
            >
              <FontAwesomeIcon icon={faClose} className="p-0 m-0" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>{error}</Col>
        </Row>
      </Col>
    ),
    {
      duration: duration,
      position: "bottom-center",
      className: styles.toastContainer,
    }
  );
}
