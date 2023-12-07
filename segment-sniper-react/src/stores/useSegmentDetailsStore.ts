import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ActivityListItem } from "../models/Activity/ActivityListItem";
import { SegmentDetails } from "../models/Segment/SegmentDetails";
import { v4 } from "uuid";

const persistOptions = {
  name: "segment-details-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Segment Details Store",
};

const useSegmentDetailsStore = create<SegmentDetailsStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          segmentDetails: [],
          selectedActivityId: null,
          setSelectedActivityId: (selectedActivityId: string) => {
            set((state) => (state.selectedActivityId = selectedActivityId));
          },
          addSegmentDetails: (segmentDetails: SegmentDetails) => {
            set((state) => {
              state.segmentDetails = [...state.segmentDetails, segmentDetails];
            });
          },
          setSegmentDetails: (segmentDetails: SegmentDetails) =>
            set((state) => {
              const index = state.segmentDetails?.findIndex(
                (sd) => sd.segmentId === segmentDetails.segmentId
              );
              if (index >= 0) {
                state.segmentDetails[index] = segmentDetails;
              }
            }),
          resetSegmentDetails: () =>
            set((state) => {
              state.segmentDetails = [];
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
  segmentDetails: SegmentDetails[];
  selectedActivityId: string | null;
  addSegmentDetails: (segmentDetails: SegmentDetails) => void;
  setSelectedActivityId: (selectedActivityId: string) => void;
  setSegmentDetails: (segmentDetails: SegmentDetails) => void;
  resetSegmentDetails: () => void;
}
