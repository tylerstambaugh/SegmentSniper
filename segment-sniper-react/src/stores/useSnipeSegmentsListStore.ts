import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { SnipeSegmentListItem } from '../models/Segment/SnipeSegmentListItem';

const persistOptions = {
  name: 'sniped-segment-list-store',
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  enabled: true,
  name: 'Sniped Segment List Store',
};

const initialState: SnipeSegmentListItem[] = [];

const useSnipeSegmentsListStore = create<SnipeSegmentsListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          snipeSegmentsList: [],
          queriedSnipeSegmentsList: [],
          setSnipeSegmentsList: (snipedSegmentsList) =>
            set((state) => {
              state.snipeSegmentsList =
                typeof snipedSegmentsList === 'function'
                  ? snipedSegmentsList(state.snipeSegmentsList)
                  : snipedSegmentsList;
            }),
          setQueriedSnipeSegmentsList: (
            queriedSnipeSegmentsList:
              | SnipeSegmentListItem[]
              | ((prevList: SnipeSegmentListItem[]) => SnipeSegmentListItem[])
          ) =>
            set((state) => {
              state.queriedSnipeSegmentsList =
                typeof queriedSnipeSegmentsList === 'function'
                  ? queriedSnipeSegmentsList(state.queriedSnipeSegmentsList)
                  : queriedSnipeSegmentsList;
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
          resetQueriedSnipeSegmentsList: () =>
            set((state) => {
              state.queriedSnipeSegmentsList = initialState;
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
  queriedSnipeSegmentsList: SnipeSegmentListItem[];
  setSnipeSegment: (snipeSegmentListITem: SnipeSegmentListItem) => void;
  setSnipeSegmentsList: (
    snipedSegmentsList:
      | SnipeSegmentListItem[]
      | ((prevList: SnipeSegmentListItem[]) => SnipeSegmentListItem[])
  ) => void;
  appendSnipeSegmentList: (snipedSegmentList: SnipeSegmentListItem[]) => void;
  setQueriedSnipeSegmentsList: (
    queriedSnipeSegmentsList:
      | SnipeSegmentListItem[]
      | ((prevList: SnipeSegmentListItem[]) => SnipeSegmentListItem[])
  ) => void;
  resetSnipedSegmentsList: () => void;
  resetQueriedSnipeSegmentsList: () => void;
}
