import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";
import useSegmentEffortsListStore from "../../../stores/useSegmentEffortsListStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as circleCheck } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-solid-svg-icons";
import { SegmentEffortListItem } from "../../../models/Segment/SegmentEffortListItem";
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";

export interface SegmentListDataTableProps {
  selectedActivityId: string;
  snipeLoading: boolean;
  handleShowSnipeSegmentsModal: () => void;
  handleShowSegmentDetails: (segmentId: string) => void;
}

export const SegmentListDataTable = (props: SegmentListDataTableProps) => {
  const segmentList = useSegmentEffortsListStore(
    (state) => state.segmentEffortsList
  );

  type TableDataRow = SegmentEffortListItem & {
    detailsButton: any;
    starButton: any;
    rowLoading: boolean;
  };

  const tableBody: TableDataRow[] = segmentList.map((item) => ({
    ...item,
    detailsButton: null,
    starButton: null,
    rowLoading: false,
  }));

  const header: TableColumnType<TableDataRow>[] = [
    { title: "Name", prop: "name", isFilterable: true },
    { title: "Id", prop: "segmentId" },
    { title: "Distance", prop: "distance", isSortable: true },
    { title: "Time", prop: "time", isSortable: true },
    {
      prop: "detailsButton",
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            props.handleShowSegmentDetails(row.segmentId!);
          }}
        >
          Details
        </Button>
      ),
    },
    {
      prop: "starButton",
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            //handleStarSegmentClick(row);
          }}
        >
          {row.rowLoading ? (
            <Spinner
              as="span"
              variant="light"
              size="sm"
              role="status"
              aria-hidden="true"
              animation="border"
            />
          ) : row.starred ? (
            <FontAwesomeIcon icon={circleCheck} />
          ) : (
            <FontAwesomeIcon icon={regularStar} />
          )}
        </Button>
      ),
    },
  ];

  return (
    <>
      {segmentList.length > 0 ? (
        <Container className="p-2 mb-1 col-12 bg-light text-dark border rounded">
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
                <h3>Segments</h3>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col sm={3}>
                <Filter placeholder="Filter Segments" />
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  className="px-5"
                  variant="primary"
                  value="Snipe!"
                  onClick={props.handleShowSnipeSegmentsModal}
                  disabled={props.snipeLoading}
                >
                  Snipe!
                  {props.snipeLoading && (
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      animation="border"
                    />
                  )}
                </Button>
              </Col>
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
        <Container className="p-2 mb-1 col-12 bg-light text-dark border rounded">
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
                <h3>Segments</h3>
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
