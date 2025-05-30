import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ActivityListItem } from '../models/Activity/ActivityListItem';

const persistOptions = {
  name: 'activity-list-store',
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  enabled: true,
  name: 'Activity List Store',
};

const initialState: ActivityListItem[] = [];

const useActivityListStore = create<ActivityListStore>()(
  devtools(
    persist(
      immer((set) => ({
        activityList: initialState,
        selectedActivityId: null,
        setActivityList: (activityList: ActivityListItem[]) =>
          set((state) => {
            state.activityList = activityList;
          }),
        setSelectedActivityId: (selectedActivityId: string) =>
          set((state) => {
            state.selectedActivityId = selectedActivityId;
          }),
        resetActivityList: () =>
          set((state) => {
            state.activityList = [];
          }),
      })),
      persistOptions
    ),
    devtoolOptions
  )
);

export default useActivityListStore;

interface ActivityListStore {
  activityList: ActivityListItem[];
  selectedActivityId: string | null;
  setActivityList: (activityList: ActivityListItem[]) => void;
  setSelectedActivityId: (selectedActivityId: string) => void;
  resetActivityList: () => void;
}
