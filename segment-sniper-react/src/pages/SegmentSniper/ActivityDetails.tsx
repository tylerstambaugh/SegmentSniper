import { useEffect, useState } from "react";
import { useSnipeSegments } from "../../hooks/Api/Segments/useSnipeSegments";
import useActivityListStore from "../../stores/useActivityListStore";
import toast from "react-hot-toast";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import ActivityCard from "../../components/Molecules/Activity/ActivityCard";
import SnipeSegmentsCardList from "../../components/Molecules/SnipeSegment/SnipeSegmentCardList";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import SnipeOptions, {
  FilterOptions,
} from "../../components/Organisms/SnipeOptions";
import useHandleSortChange from "../../hooks/SegmentSniper/useHandleSortChange";
import { useConvertTimeStringToNumericValue } from "../../hooks/useConvertTimeStringToNumericValue";

const ActivityDetails = () => {
  const navigate = useNavigate();
  const snipeSegments = useSnipeSegments();
  const [activityList, setSelectedActivityId, selectedActivityId] =
    useActivityListStore((state) => [
      state.activityList,
      state.setSelectedActivityId,
      state.selectedActivityId,
    ]);
  const [
    snipeSegmentList,
    queriedSnipeSegmentList,
    setSnipeSegmentList,
    setQueriedSnipeSegmentList,
  ] = useSnipeSegmentsListStore((state) => [
    state.snipeSegmentsList,
    state.queriedSnipeSegmentsList,
    state.setSnipeSegmentsList,
    state.setQueriedSnipeSegmentsList,
  ]);
  const convertTime = useConvertTimeStringToNumericValue();
  const handleSorting = useHandleSortChange();
  const [filtering, setFiltering] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>();

  function backToActivitiesButtonClick() {
    setSelectedActivityId("");
    navigate(`/${AppRoutes.ActivitySearchResults}`);
  }
  useEffect(() => {
    const fetchSnipeSegments = async () => {
      try {
        const result = await snipeSegments.mutateAsync({
          activityId: selectedActivityId!,
        });
      } catch (error) {
        toast.error(`Error fetching snipe segments: ${error}`);
      }
    };

    if (
      !Array.isArray(snipeSegmentList) ||
      snipeSegmentList.filter((s) => s.activityId === selectedActivityId)
        .length === 0
    ) {
      fetchSnipeSegments();
    }
    handleSorting.Sort("date");
  }, [selectedActivityId]);

  function handleFilterOptionsChange(values: FilterOptions) {
    setFiltering(true);
    setFilterOptions(values);
    console.log("handleFilterOptionChange : values =", values);
    setFiltering(false);
  }

  function applyFilter() {
    const newFilteredList = [...queriedSnipeSegmentList].filter((s) => {
      let secondsFromKom = convertTime.timeStringToNumericValue(
        s.secondsFromKom!
      );
      let secondsFromQom = convertTime.timeStringToNumericValue(
        s.secondsFromQom!
      );

      const percentageFilter =
        (filterOptions!.percentageFromLeader != null &&
          filterOptions!.percentageFromLeader != undefined &&
          (filterOptions?.leaderTypeQom
            ? s.percentageFromQom! <= filterOptions!.percentageFromLeader
            : s.percentageFromKom! <= filterOptions!.percentageFromLeader)) ||
        filterOptions!.percentageFromLeader === 0 ||
        filterOptions!.percentageFromLeader === undefined;
      console.log("percentage filter", percentageFilter);

      // const secondsFilter =
      //   (secondsFromLeader != null &&
      //     secondsFromLeader != undefined &&
      //     (useQom
      //       ? secondsFromQom <= secondsFromLeader
      //       : secondsFromKom <= secondsFromLeader)) ||
      //   secondsFromLeader === undefined;
      // console.log("seconds filter:", secondsFilter);

      const headingFilter =
        filterOptions?.headings &&
        filterOptions?.headings.length > 0 &&
        filterOptions?.headings.includes(s.heading!);
      // console.log("heading", s.heading);
      // console.log("headingFilter", headingFilter);
      // console.log("headings filter", headingsFilter);

      const komFilter = filterOptions?.leaderTypeQom
        ? secondsFromQom !== 0
        : secondsFromKom !== 0;
      return komFilter && percentageFilter;
    });
    setQueriedSnipeSegmentList(newFilteredList);
  }

  useEffect(() => {
    console.log("leaderTypeQom", filterOptions?.leaderTypeQom);
  }, [filterOptions]);

  return (
    <>
      <Container className="mb-4">
        <Row className="pt-3">
          <Col className="d-flex justify-content-around">
            <Button
              name="backToSearch"
              onClick={() => {
                backToActivitiesButtonClick();
              }}
            >
              Back
            </Button>
            <h3>Activity Details</h3>
          </Col>
        </Row>
        <ActivityCard
          activity={
            activityList.find((a) => a.activityId === selectedActivityId)!
          }
          showMap={false}
        />
        <Row>
          <SnipeOptions onChange={handleFilterOptionsChange} />
        </Row>
        <Row>
          <SnipeSegmentsCardList
            snipeListLoading={snipeSegments.isLoading}
            filtering={filtering}
            segmentList={queriedSnipeSegmentList}
            leaderTypeQom={filterOptions?.leaderTypeQom!}
          />
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center pt-3 pb-3">
            <Button
              name="backToSearch"
              onClick={() => {
                setSelectedActivityId("");
                navigate(`/${AppRoutes.ActivitySearchResults}`);
              }}
            >
              Back to Activities
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActivityDetails;
