import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SnipeSegmentListItem } from "../models/Segment/SnipeSegmentListItem";

const persistOptions = {
  name: "sniped-segment-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Sniped Segment List Store",
};

const initialState: SnipeSegmentListItem[] = [];

const useSnipeSegmentsListStore = create<SnipeSegmentsListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          snipeSegmentsList: [],
          setSnipeSegmentsList: (snipedSegmentsList) =>
            set((state) => {
              state.snipeSegmentsList =
                typeof snipedSegmentsList === "function"
                  ? snipedSegmentsList(state.snipeSegmentsList)
                  : snipedSegmentsList;
            }),
          appendSnipeSegmentList: (snipeSegmentList: SnipeSegmentListItem[]) =>
            set((state) => {
              state.snipeSegmentsList =
                state.snipeSegmentsList.concat(snipeSegmentList);
            }),
          setSnipeSegment: (snipeSegmentListItem: SnipeSegmentListItem) =>
            set((state) => {
              const segmentId = snipeSegmentListItem.segmentId;
              const index = state.snipeSegmentsList.findIndex(
                (item) => item.segmentId === segmentId
              );
              if (index !== -1) {
                state.snipeSegmentsList[index] = snipeSegmentListItem;
              } else {
                state.snipeSegmentsList.push(snipeSegmentListItem);
              }
            }),
          resetSnipedSegmentsList: () =>
            set((state) => {
              state.snipeSegmentsList = initialState;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useSnipeSegmentsListStore;

interface SnipeSegmentsListStore {
  snipeSegmentsList: SnipeSegmentListItem[];
  setSnipeSegment: (snipeSegmentListITem: SnipeSegmentListItem) => void;
  setSnipeSegmentsList: (
    snipedSegmentsList:
      | SnipeSegmentListItem[]
      | ((prevList: SnipeSegmentListItem[]) => SnipeSegmentListItem[])
  ) => void;
  appendSnipeSegmentList: (snipedSegmentList: SnipeSegmentListItem[]) => void;
  resetSnipedSegmentsList: () => void;
}
