import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Headings } from "../../../enums/Headings";
import { useState } from "react";
import "../../../App.css";

export interface HeadingsFilterProps {
  headings: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const HeadingsFilter = ({ headings, onChange }: HeadingsFilterProps) => {
  const headingsArray: { label: string; value: string }[] = Object.entries(
    Headings
  ).map(([key, value]) => ({ label: value, value: key }));
  const animatedComponents = makeAnimated();

  return (
    <Row className="d-flex justify-content-between pb-0">
      <Col xs={4} className="text-start snipe-option-label p-0">
        <p>Heading:</p>
      </Col>

      <Col xs={8} className="justify-content-end text-end">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          value={headingsArray.filter((h) => headings.includes(h.label))}
          isMulti
          options={headingsArray}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.label
            );
            onChange(selectedValues);
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              
              padding: "0px 2px",
              margin: "0px",
              textAlign: "start",
            }),
          }}
        />
      </Col>
    </Row>
  );
};

export default HeadingsFilter;
