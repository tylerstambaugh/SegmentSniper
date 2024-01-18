import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Headings } from "../../../enums/Headings";
import { useState } from "react";

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
    <Row className="pb-2">
      <Col xs={6} className="text-start snipe-option-label">
        <p>Heading:</p>
      </Col>

      <Col xs={6} className="text-end">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          value={headingsArray.filter((h) => headings.includes(h.label))}
          isMulti
          options={headingsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.label
            );
            onChange(selectedValues);
          }}
        />
      </Col>
    </Row>
  );
};

export default HeadingsFilter;
