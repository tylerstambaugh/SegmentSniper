import React from "react";
import { toast } from "react-hot-toast";
import styles from "./CustomToast.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row } from "react-bootstrap";

export type CustomToastProps = {
  message: string;
  type: "error" | "loading" | "success" | "default";
};

export function CustomToast({ message, type }: CustomToastProps) {
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
      <div style={{ color: "white", padding: "10px", backgroundColor }}>
        <Row className="text-end">
          <Button
            onClick={() => toast.dismiss(t.id)}
            className={styles.toastButton}
            variant="secondary"
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </Row>
        <Row>{message}</Row>
      </div>
    ),
    {
      duration: Infinity,
      position: "bottom-center",
      className: styles.toastContainer,
    }
  );
}
