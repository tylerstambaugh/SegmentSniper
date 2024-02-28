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
  if (type === "success") {
    backgroundColor = "green";
  } else if (type === "error") {
    backgroundColor = `#fd2c60`;
  } else if (type === "loading") {
    backgroundColor = "blue";
  } else {
    backgroundColor = "gray";
  }

  toast.custom(
    (t) => (
      <div className={styles.toastContainer}>
        <Col xs={8} sm={4} style={{ backgroundColor }}>
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
            <Col xs={9}>{error}</Col>
          </Row>
        </Col>
      </div>
    ),
    {
      duration: Infinity,
      position: "bottom-center",
      className: styles.toastContainer,
    }
  );
}
