import React from "react";
import { Col, Row } from "react-bootstrap";
import Placeholder from "./Placeholder";

interface Props {
  count?: number;
}

export default function PlaceholderBlocks({ count }: Props) {
  const countArr = Array.from({ length: count ?? 1 }, (_, i) => i + 1);
  return (
    <>
      <Col>
        {countArr.map((block, index) => (
          <React.Fragment key={index}>
            <Row>
              <Col className={"pt-3"}>
                <Placeholder
                  rowSizes={
                    index % 2 ? [4, 3, 6, 2, 3, 4, 6] : [6, 4, 5, 7, 4, 3, 4]
                  }
                />
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </Col>
    </>
  );
}
