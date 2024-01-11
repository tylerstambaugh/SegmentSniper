import React from "react";
import { Placeholder as BSPlaceholder } from "react-bootstrap";
import styles from "./Placeholder.module.scss";

type rowSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface Props {
  rowSizes: rowSizes[];
}
export default function Placeholder({ rowSizes }: Props) {
  return (
    <>
      <BSPlaceholder animation="glow">
        {rowSizes.map((size, index) => (
          <React.Fragment key={index}>
            <BSPlaceholder
              className={styles.compContainer}
              xs={size}
              key={index}
            />{" "}
          </React.Fragment>
        ))}
      </BSPlaceholder>
    </>
  );
}
