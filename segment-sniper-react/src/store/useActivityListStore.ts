import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ActivityListItem } from "../models/Activity/ActivityListItem";

const persistOptions = {
  name: "activity-list-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Activity List Store",
};

const initialState = {
  activityList: [],
};

const useApiConfigStore = create<ActivityListStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          activityList: [],
          setActivityList: (activityList: ActivityListItem[]) =>
            set((state) => {
              state.activityList = activityList;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useApiConfigStore;

interface ActivityListStore {
  activityList: ActivityListItem[];
  setActivityList: (activityList: ActivityListItem[]) => void;
}
