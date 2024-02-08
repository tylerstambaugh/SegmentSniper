import { Col } from "react-bootstrap";
import styles from "./SortFilter.module.scss";
import Select, { GroupBase } from "react-select";
import makeAnimated from "react-select/animated";
import { SegmentSortOptions } from "../../../../enums/SegmentSortOptions";

export interface SortFilterProps {
  sortBy: string;
  onChange: (value: string) => void;
}

const SortFilter = ({ sortBy, onChange }: SortFilterProps) => {
  const animatedComponents = makeAnimated();
  const sortOptionsArray = Object.values(SegmentSortOptions);

  return (
    <div>
      <Col className="d-flex justify-content-between">
        <p className={styles.label}>Sort By:</p>
        <div style={{ flex: "1" }}>
          <Select
            closeMenuOnSelect={true}
            className="ps-3"
            placeholder={"Select"}
            components={animatedComponents}
            value={sortBy}
            isMulti={false}
            onChange={(selectedValue) => {
              onChange(selectedValue ?? "Date");
            }}
            options={sortOptionsArray}
          />
        </div>
      </Col>
    </div>
  );
};

export default SortFilter;
