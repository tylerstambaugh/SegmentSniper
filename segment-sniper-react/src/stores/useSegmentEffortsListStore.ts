import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SegmentEffortListItem as SegmentEffortsListItem } from "../models/Segment/SegmentEffortListItem";

const persistOptions = {
  name: "segment-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Segment Efforts List Store",
};

const useSegmentEffortsListStore = create<SegmentEffortsListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          segmentEffortsList: [],
          setSegmentEffortsList: (
            segmentEffortsList: SegmentEffortsListItem[]
          ) =>
            set((state) => {
              state.segmentEffortsList = segmentEffortsList;
            }),
          resetSegmentEffortsList: () =>
            set((state) => {
              state.segmentEffortsList = [];
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSegmentEffortsListStore;

interface SegmentEffortsListStore {
  segmentEffortsList: SegmentEffortsListItem[];
  setSegmentEffortsList: (segmentEffortsList: SegmentEffortsListItem[]) => void;
  resetSegmentEffortsList: () => void;
}
