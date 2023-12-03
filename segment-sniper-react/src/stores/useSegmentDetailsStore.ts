import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ActivityListItem } from "../models/Activity/ActivityListItem";
import { SegmentDetails } from "../models/Segment/SegmentDetails";

const persistOptions = {
  name: "segment-details-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Segment Detials Store",
};

const initialState: Partial<SegmentDetails> = {};

const useSegmentDetailsStore = create<SegmentDetailsStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          segmentDetails: null,
          selectedActivityId: null,
          setSegmentDetails: (segmentDetails: SegmentDetails) =>
            set((state) => {
              state.segmentDetails = segmentDetails;
            }),
          resetSegmentDetails: () =>
            set((state) => {
              state.segmentDetails = null;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSegmentDetailsStore;

interface SegmentDetailsStore {
  segmentDetails?: SegmentDetails | null;
  setSegmentDetails: (segmentDetails: SegmentDetails) => void;
  resetSegmentDetails: () => void;
}
