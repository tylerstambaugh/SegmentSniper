import { Col } from "react-bootstrap";
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
    <div>
      <Col className="d-flex justify-content-between">
        <p className={styles.label}>Heading:</p>
        <div style={{ flex: "1" }}>
          <Select
            closeMenuOnSelect={false}
            className="ps-3"
            placeholder={"Select"}
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
                minHeight: "30px",
                height: "30px",
                marginTop: "5px",
              }),
              multiValue: (baseStyles, props) => ({
                ...baseStyles,
                ...{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "20px",
                  marginBottom: "12px",
                },
              }),
              multiValueLabel: (baseStyles, props) => ({
                ...baseStyles,
                ...{
                  textAlign: "right",
                },
              }),
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                ...{
                  textAlign: "right",
                  paddingBottom: "10px",
                },
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                ...{
                  textAlign: "right",
                  paddingBottom: "10px",
                },
              }),
              indicatorSeparator: (baseStyles, state) => ({
                ...baseStyles,
                ...{
                  textAlign: "right",
                  paddingBottom: "10px",
                },
              }),
            }}
          />
        </div>
      </Col>
    </div>
  );
};

export default HeadingsFilter;
