import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SegmentListItem } from "../models/Segment/SegmentListItem";

const persistOptions = {
  name: "segment-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Segment List Store",
};

const useSegmentListStore = create<SegmentListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          segmentList: [],
          setSegmentList: (segmentList: SegmentListItem[]) =>
            set((state) => {
              state.segmentList = segmentList;
            }),
          resetSegmentList: () =>
            set((state) => {
              state.segmentList = [];
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSegmentListStore;

interface SegmentListStore {
  segmentList: SegmentListItem[];
  setSegmentList: (segmentList: SegmentListItem[]) => void;
  resetSegmentList: () => void;
}
