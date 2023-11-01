import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SegmentListItem as SegmentsListItem } from "../models/Segment/SegmentListItem";

const persistOptions = {
  name: "segment-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Segment List Store",
};

const useSegmentsListStore = create<SegmentsListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          segmentsList: [],
          setSegmentList: (segmentsList: SegmentsListItem[]) =>
            set((state) => {
              state.segmentsList = segmentsList;
            }),
          resetSegmentsList: () =>
            set((state) => {
              state.segmentsList = [];
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSegmentsListStore;

interface SegmentsListStore {
  segmentsList: SegmentsListItem[];
  setSegmentList: (segmentsList: SegmentsListItem[]) => void;
  resetSegmentsList: () => void;
}
