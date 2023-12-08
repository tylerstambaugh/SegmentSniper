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

const useSnipedSegmentsListStore = create<SnipedSegmentsListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          snipedSegmentsList: [],
          setSnipedSegmentsList: (snipedSegmentsList) =>
            set((state) => {
              state.snipedSegmentsList =
                typeof snipedSegmentsList === "function"
                  ? snipedSegmentsList(state.snipedSegmentsList)
                  : snipedSegmentsList;
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
  snipedSegmentsList: SnipedSegmentListItem[];
  setSnipedSegmentsList: (
    snipedSegmentsList:
      | SnipedSegmentListItem[]
      | ((prevList: SnipedSegmentListItem[]) => SnipedSegmentListItem[])
  ) => void;
  resetSnipedSegmentsList: () => void;
}
