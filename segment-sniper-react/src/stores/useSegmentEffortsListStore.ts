import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SegmentEffortListItem } from "../models/Segment/SegmentEffortListItem";

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
          setSegmentEffortsList: (segmentEffortsList) =>
            set((state) => {
              state.segmentEffortsList =
                typeof segmentEffortsList === "function"
                  ? segmentEffortsList(state.segmentEffortsList)
                  : segmentEffortsList;
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
  segmentEffortsList: SegmentEffortListItem[];
  setSegmentEffortsList: (
    segmentEffortsList:
      | SegmentEffortListItem[]
      | ((prevList: SegmentEffortListItem[]) => SegmentEffortListItem[])
  ) => void;
  resetSegmentEffortsList: () => void;
}
