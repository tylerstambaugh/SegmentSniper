import { useState } from "react";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ActivityListItem } from "../../../models/Activity/ActivityListItem";
import useActivityListStore from "../../../stores/useActivityListStore";
import useSegmentEffortsListStore from "../../../stores/useSegmentEffortsListStore";

export interface ActivityDataTableProps {
  setSelectedActivity: (activityId: string) => void;
}

type ArrayElementType = ActivityListItem & {
  segmentsButton: any;
  snipeButton: any;
  detailsButton: any;
};

const ActivityListDataTable = (props: ActivityDataTableProps) => {
  const [activityList, resetActivityList] = useActivityListStore((state) => [
    state.activityList,
    state.resetActivityList,
  ]);
  const resetSegmentList = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const tableBody: ArrayElementType[] = activityList.map((item) => ({
    ...item,
    segmentsButton: null,
    snipeButton: null,
    detailsButton: null,
  }));
  const header: TableColumnType<ArrayElementType>[] = [
    { title: "Name", prop: "name", isFilterable: true },
    { title: "Id", prop: "activityId" },
    { title: "Date", prop: "startDate", isSortable: true },
    { title: "Distance", prop: "distance", isSortable: true },
    { title: "Time", prop: "elapsedTime", isSortable: true },
    { title: "Achievements", prop: "achievementCount", isSortable: true },
    { title: "Max Speed", prop: "maxSpeed", isSortable: true },
    {
      prop: "detailsButton",
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            alert(
              `${row.activityId}'s achievement count is ${row.achievementCount}`
            );
          }}
          onChange={() => console.log("blah")}
        >
          Details
        </Button>
      ),
    },
    {
      prop: "segmentsButton",
      cell: (row) => (
        <Button
          variant={
            row.activityId === selectedRow ? "primary" : "outline-primary"
          }
          onClick={() => {
            handleSegmentButtonClick(row.activityId ?? "");
          }}
        >
          Segments
        </Button>
      ),
    },
  ];

  const handleSegmentButtonClick = (activityId: string) => {
    props.setSelectedActivity(activityId);
    setSelectedRow(activityId);
  };

  const clearSearchResults = () => {
    resetActivityList();
    resetSegmentList();
  };

  return (
    <>
      {activityList.length > 0 ? (
        <Container className="p-2 mb-2 col-12 bg-light text-dark border rounded">
          <DatatableWrapper
            body={tableBody}
            headers={header}
            paginationOptionsProps={{
              initialState: {
                rowsPerPage: 5,
                options: [5, 10, 15, 20],
              },
            }}
          >
            <div>
              <Row>
                <Col>
                  <h3>Activity Search Results</h3>
                  <hr />
                </Col>
              </Row>

              <Row className="d-flex justify-content-between">
                <Col sm={3}>
                  <Filter placeholder="Filter Activities" />
                </Col>
                <Col className="d-flex justify-content-end mx-5">
                  <Button
                    className="px-5"
                    onClick={() => {
                      clearSearchResults();
                      setSelectedRow("");
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </div>
            <Row className="mb-4">
              <Col
                xs={12}
                sm={6}
                lg={4}
                className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
              ></Col>
              <Col
                xs={12}
                sm={6}
                lg={4}
                className="d-flex flex-col justify-content-end align-items-end"
              ></Col>
            </Row>
            <Table>
              <TableHeader />
              <TableBody />
            </Table>
            <Row className="justify-content-between">
              <Col sm={2}>
                <PaginationOptions />
              </Col>
              <Col sm={5} className="mt-3">
                <Pagination />
              </Col>
            </Row>
          </DatatableWrapper>
        </Container>
      ) : (
        <Container className="md-auto p-2 mb-1 col-12 bg-light text-dark border rounded">
          <DatatableWrapper
            body={tableBody}
            headers={header}
            paginationOptionsProps={{
              initialState: {
                rowsPerPage: 10,
                options: [5, 10, 15, 20],
              },
            }}
          >
            <Row>
              <Col>
                <h3>Activity Search Results</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>No Results to Display</p>
              </Col>
            </Row>
          </DatatableWrapper>
        </Container>
      )}
    </>
  );
};
export default ActivityListDataTable;
