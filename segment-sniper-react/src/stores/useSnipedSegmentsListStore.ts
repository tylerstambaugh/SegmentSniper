import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SnipedSegmentListItem as SnipedSegmentsListItem } from "../models/Segment/SnipedSegmentListItem";

const persistOptions = {
  name: "sniped-segment-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Sniped Segment List Store",
};

const initialState = [{}];

const useSnipedSegmentsListStore = create<SnipedSegmentsListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          snipedSegmentsList: [],
          setSnipedSegmentsList: (
            snipedSegmentsList: SnipedSegmentsListItem[]
          ) =>
            set((state) => {
              state.snipedSegmentsList = snipedSegmentsList;
            }),
          resetSnipedSegmentsList: () =>
            set((state) => {
              state.snipedSegmentsList = initialState;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSnipedSegmentsListStore;

interface SnipedSegmentsListStore {
  snipedSegmentsList: SnipedSegmentsListItem[];
  setSnipedSegmentsList: (segmentList: SnipedSegmentsListItem[]) => void;
  resetSnipedSegmentsList: () => void;
}
