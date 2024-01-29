import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Headings } from "../../../../enums/Headings";
import styles from "./HeadingsFilter.module.scss";

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
    <Row className="d-flex justify-content-between p-0">
      <Col sm={5} className={styles.label}>
        <p>Heading:</p>
      </Col>

      <Col sm={7} className="text-end">
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
              ...(styles.select as React.CSSProperties),
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              ...(styles.menu as React.CSSProperties),
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              ...(styles.input as React.CSSProperties),
            }),
          }}
        />
      </Col>
    </Row>
  );
};

export default HeadingsFilter;
