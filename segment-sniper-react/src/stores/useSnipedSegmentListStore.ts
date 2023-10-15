import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SnipedSegmentListItem } from "../models/Segment/SnipedSegmentListItem";

const persistOptions = {
  name: "sniped-segment-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Sniped Segment List Store",
};

const initialState = [{}];

const useSnipedSegmentListStore = create<SnipedSegmentListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          snipedSegmentList: [],
          setSnipedSegmentList: (snipedSegmentList: SnipedSegmentListItem[]) =>
            set((state) => {
              state.snipedSegmentList = snipedSegmentList;
            }),
          resetSnipedSegmentList: () =>
            set((state) => {
              state.snipedSegmentList = initialState;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSnipedSegmentListStore;

interface SnipedSegmentListStore {
  snipedSegmentList: SnipedSegmentListItem[];
  setSnipedSegmentList: (segmentList: SnipedSegmentListItem[]) => void;
  resetSnipedSegmentList: () => void;
}
