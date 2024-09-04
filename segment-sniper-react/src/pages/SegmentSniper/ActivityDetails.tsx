import { useEffect, useState } from "react";
import { useSnipeSegments } from "../../hooks/Api/Segments/useSnipeSegments";
import useActivityListStore from "../../stores/useActivityListStore";
import toast from "react-hot-toast";
import { Button, Col, Row, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import ActivityCard from "../../components/Molecules/Activity/ActivityCard/ActivityCard";
import SnipeSegmentsCardList from "../../components/Molecules/SnipeSegment/SnipeSegmentCardList/SnipeSegmentCardList";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import SnipeOptions, {
  FilterOptions,
} from "../../components/Organisms/SnipeOptions/SnipeOptions";
import useHandleSortChange from "../../hooks/SegmentSniper/useHandleSortChange";
import useHandlePercentageFromLeaderFilter from "../../hooks/SegmentSniper/useHandlePercentageFromLeaderFilter";
import useHandleSecondsFromLeaderFilter from "../../hooks/SegmentSniper/useHandleSecondsFromLeaderFilter";
import useHandleHeadingsFilter from "../../hooks/SegmentSniper/useHandleHeadingsFilter";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

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
    setQueriedSnipeSegmentList,
  ] = useSnipeSegmentsListStore((state) => [
    state.snipeSegmentsList,
    state.queriedSnipeSegmentsList,
    state.setQueriedSnipeSegmentsList,
  ]);
  const handleSorting = useHandleSortChange();
  const handlePercentageFromLeaderFilter =
    useHandlePercentageFromLeaderFilter();
  const handleSecondsFromLeaderFilter = useHandleSecondsFromLeaderFilter();
  const handleHeadingsFilter = useHandleHeadingsFilter();
  const [filtering, setFiltering] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    percentageFromLeader: undefined,
    secondsFromLeader: undefined,
    leaderTypeQom: false,
    headings: [],
    sortBy: "SortBy",
  });
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  function backToActivitiesButtonClick() {
    setSelectedActivityId("");
    navigate(`/${AppRoutes.ActivitySearchResults}`);
  }

  useEffect(() => {
    const fetchSnipeSegments = async () => {
      try {
        await snipeSegments.mutateAsync({
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

    setQueriedSnipeSegmentList(
      snipeSegmentList.filter((s) => s.activityId === selectedActivityId)
    );
    handleSorting.Sort("date", queriedSnipeSegmentList);
  }, [handleSorting, queriedSnipeSegmentList, selectedActivityId, setQueriedSnipeSegmentList, snipeSegmentList, snipeSegments]);

  async function handleFilterOptionsChange(values: FilterOptions) {
    const segmentList = snipeSegmentList.filter(
      (s) => s.activityId === selectedActivityId
    );

    setFiltering(true);
    setFilterOptions({ ...filterOptions, ...values });

    let percentageFilteredSegmentList: SnipeSegmentListItem[] = [];
    let secondsFilteredSegmentList: SnipeSegmentListItem[] = [];
    let headingsFilteredSegmentList: SnipeSegmentListItem[] = [];

    percentageFilteredSegmentList =
      await handlePercentageFromLeaderFilter.Handle(
        values.percentageFromLeader ?? 0,
        values.leaderTypeQom,
        segmentList
      );

    secondsFilteredSegmentList = await handleSecondsFromLeaderFilter.Handle(
      values.secondsFromLeader ?? 0,
      values.leaderTypeQom,
      segmentList
    );

    if (values.headings) {
      headingsFilteredSegmentList = await handleHeadingsFilter.Handle(
        values.headings,
        segmentList
      );
    }

    let filteredSegmentList = [
      ...new Set([
        ...percentageFilteredSegmentList,
        ...secondsFilteredSegmentList,
      ]),
    ].filter((item) => headingsFilteredSegmentList.includes(item));

    filteredSegmentList = await handleSorting.Sort(
      values.sortBy!,
      filteredSegmentList
    );
    setQueriedSnipeSegmentList(filteredSegmentList);
    setCarouselIndex(0);
    setFiltering(false);
  }

  useEffect(() => {
    setQueriedSnipeSegmentList(
      snipeSegmentList.filter((s) => s.activityId === selectedActivityId)
    );
  }, [selectedActivityId]);

  useEffect(() => {
    handleSorting.Sort(filterOptions.sortBy!, queriedSnipeSegmentList);
  }, [filterOptions.sortBy]);

  return (
    <>
      <Col md={7} className="mb-2 mx-auto">
        <Row className="pt-1">
          <Col className="d-flex justify-content-around">
            <Button
              name="backToSearch"
              onClick={() => {
                backToActivitiesButtonClick();
              }}
              className="mt-2 px-2"
            >
              Back
            </Button>
            <h3 className="pt-2 mb-0 ms-4">Activity Details</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <ActivityCard
              activity={
                activityList.find((a) => a.activityId === selectedActivityId)!
              }
              isActivitySearchResults={false}
              mapShown={true}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SnipeOptions onChange={handleFilterOptionsChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SnipeSegmentsCardList
              snipeListLoading={snipeSegments.isLoading}
              filtering={filtering}
              segmentList={queriedSnipeSegmentList}
              leaderTypeQom={filterOptions?.leaderTypeQom}
              carouselIndex={carouselIndex}
            />
          </Col>
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
      </Col>
    </>
  );
};

export default ActivityDetails;
