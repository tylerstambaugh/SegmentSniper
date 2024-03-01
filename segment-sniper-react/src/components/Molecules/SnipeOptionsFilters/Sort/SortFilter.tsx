import { Col } from "react-bootstrap";
import Select from "react-select";
import OptionsType from "react-select";
import { SegmentSortOption } from "../../../../enums/SegmentSortOptions";
import styles from "./SortFilter.module.scss";

export interface SortFilterProps {
  sortBy: string;
  onChange: (value: string) => void;
}

const SortFilter = ({ sortBy, onChange }: SortFilterProps) => {
  const sortOptions: { label: string; value: string }[] = Object.entries(
    SegmentSortOption
  ).map(([key, value]) => ({ label: value, value: key }));

  return (
    <div>
      <Col className="d-flex justify-content-between">
        <p className={styles.label}>Sort By:</p>
        <div style={{ flex: "1" }}>
          <Select
            closeMenuOnSelect={true}
            className="ps-3 pb-1 mt-1"
            placeholder={"Select"}
            onChange={(selectedValue) => {
              onChange(selectedValue?.value ?? "Date");
            }}
            options={sortOptions}
            styles={{
              // control: (baseStyles, state) => ({
              //   ...baseStyles,
              //   minHeight: "30px",
              //   height: "30px",
              //   marginTop: "5px",
              // }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                ...{
                  textAlign: "right",
                },
              }),
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                ...{
                  textAlign: "right",
                },
              }),
            }}
          />
        </div>
      </Col>
    </div>
  );
};

export default SortFilter;
