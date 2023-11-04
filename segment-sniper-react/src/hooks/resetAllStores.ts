import useActivityListStore from "../stores/useActivityListStore";
import useSegmentsListStore from "../stores/useSegmentsListStore";
import useSnipedSegmentsListStore from "../stores/useSnipedSegmentsListStore";
import useTokenDataStore from "../stores/useTokenStore";
import useUserStore from "../stores/useUserStore";

export const useResetAllStores = () => {
  const resetSnipedSegmentsListStore = useSnipedSegmentsListStore(
    (state) => state.resetSnipedSegmentsList
  );
  const resetActivityListStore = useActivityListStore(
    (state) => state.resetActivityList
  );
  const resetSegmentsListStore = useSegmentsListStore(
    (state) => state.resetSegmentsList
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
