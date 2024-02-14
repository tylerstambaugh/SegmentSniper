import React from "react";
import { toast } from "react-hot-toast";

export type CustomToastProps = {
  message: string;
  type: string;
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

  toast.custom((t) => (
    <div style={{ color: "white", padding: "10px", backgroundColor }}>
      {message}
      <button
        onClick={() => toast.dismiss(t.id)}
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        Close
      </button>
    </div>
  ));
}
