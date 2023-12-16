import useActivityListStore from "../stores/useActivityListStore";
import useSegmentEffortsListStore from "../stores/useSegmentEffortsListStore";
import useSnipeSegmentsListStore from "../stores/useSnipeSegmentsListStore";
import useTokenDataStore from "../stores/useTokenStore";
import useUserStore from "../stores/useUserStore";

export const useResetAllStores = () => {
  const resetSnipedSegmentsListStore = useSnipeSegmentsListStore(
    (state) => state.resetSnipedSegmentsList
  );
  const resetActivityListStore = useActivityListStore(
    (state) => state.resetActivityList
  );
  const resetSegmentsListStore = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );
  const resetTokenDataStore = useTokenDataStore(
    (state) => state.resetTokenDataStore
  );
  const resetUserStore = useUserStore((state) => state.resetUserStore);

  function reset() {
    resetTokenDataStore();
    resetUserStore();
    resetActivityListStore();
    resetSegmentsListStore();
    resetSnipedSegmentsListStore();
  }

  return reset;
};
