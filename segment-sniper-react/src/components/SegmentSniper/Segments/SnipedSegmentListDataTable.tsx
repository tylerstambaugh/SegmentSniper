import {
  DatatableWrapper,
  Filter,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";
import { SnipedSegmentListItem } from "../../../models/Segment/SnipedSegmentListItem";
import useSnipedSegmentsListStore from "../../../stores/useSnipedSegmentsListStore";
import {
  Button,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as circleCheck } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-solid-svg-icons";

export interface SnipedSegmentListDataTableProps {
  clearSnipedSegments: () => void;
  handleStarSnipedSegment: (props: any) => void;
}

export const SnipedSegmentListDataTable = (
  props: SnipedSegmentListDataTableProps
) => {
  const [snipedSegmentList, resetSnipedSegmetnList] =
    useSnipedSegmentsListStore((state) => [
      state.snipedSegmentsList,
      state.resetSnipedSegmentsList,
    ]);

  type TableDataRow = SnipedSegmentListItem & {
    starButton: any;
    detailsButton: any;
  };

  function clearSnipedSegments() {
    resetSnipedSegmetnList();
  }

  const tableBody: TableDataRow[] = snipedSegmentList.map((item) => ({
    ...item,
    starButton: null,
    detailsButton: null,
  }));

  const header: TableColumnType<TableDataRow>[] = [
    { title: "Name", prop: "name", isFilterable: true },
    { title: "Id", prop: "segmentId" },
    { title: "Distance", prop: "distance", isSortable: true },
    { title: "KOM Time", prop: "komTime", isSortable: true },
    {
      title: "Seconds From KOM/QOM",
      prop: "secondsFromLeader",
    },
    { title: "% From KOM/QOM", prop: "percentageFromLeader" },
    {
      prop: "detailsButton",
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            alert(`We'll show details`);
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
            handleStarSegmentClick(row);
          }}
        >
          {row.starred ? (
            <FontAwesomeIcon icon={circleCheck} />
          ) : (
            <FontAwesomeIcon icon={regularStar} />
          )}
        </Button>
      ),
    },
  ];

  const handleStarSegmentClick = async (row: TableDataRow) => {
    // setListOfSegments((prevList) =>
    //   prevList.map((item) =>
    //     item.segmentId === row.segmentId ? { ...item, rowLoading: true } : item
    //   )
    // );
    // try {
    //   await props.handleStarSnipedSegment({
    //     segmentId: row.segmentId,
    //     starSegment: !row.starred,
    //   });
    //   setListOfSegments((prevList) =>
    //     prevList.map((item) =>
    //       item.segmentId === row.segmentId
    //         ? { ...item, rowLoading: false }
    //         : item
    //     )
    //   );
    // } catch (error) {
    //   console.error("Error occurred while starring the segment:", error);
    //   setListOfSegments((prevList) =>
    //     prevList.map((item) =>
    //       item.segmentId === row.segmentId
    //         ? { ...item, rowLoading: false }
    //         : item
    //     )
    //   );
    // }
  };

  return (
    <>
      {snipedSegmentList.length > 0 ? (
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
                <h3>Sniped Segments</h3>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col sm={3}>
                <Filter />
              </Col>
              <Col className="d-flex justify-content-end pb-3">
                <Button
                  variant="primary"
                  onClick={(e) => props.clearSnipedSegments()}
                >
                  Reset
                </Button>
              </Col>
            </Row>
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
              <Col md={2}>
                <PaginationOptions />
              </Col>
              <Col md={5}>
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
                <h3>Segments List Results</h3>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>No segments matching filter criteria</h4>
                <p>Try harder next time woosie</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center pb-3">
                <Button
                  variant="primary"
                  onClick={(e) => props.clearSnipedSegments()}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </DatatableWrapper>
        </Container>
      )}
    </>
  );
};
