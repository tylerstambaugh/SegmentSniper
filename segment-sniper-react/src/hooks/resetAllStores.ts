import useActivityListStore from '../stores/useActivityListStore';
import useProfileStore from '../stores/useProfileStore';
import useSegmentEffortsListStore from '../stores/useSegmentEffortsListStore';
import useSnipeSegmentsListStore from '../stores/useSnipeSegmentsListStore';
import useUserStore from '../stores/useUserStore';

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
  const resetUserStore = useUserStore((state) => state.resetUserStore);

  const resetProfileDataStore = useProfileStore(
    (state) => state.resetProfileData
  );

  function reset() {
    resetUserStore();
    resetActivityListStore();
    resetSegmentsListStore();
    resetSnipedSegmentsListStore();
    resetProfileDataStore();
  }

  return reset;
};
