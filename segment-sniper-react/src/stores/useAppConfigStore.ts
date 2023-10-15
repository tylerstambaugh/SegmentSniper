import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const persistOptions = {
  name: "app-config-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "App Config Store",
};

export type AppConfig = {
  clientId: string;
};

const initialAppConfigState: AppConfig = {
  clientId: "",
};

const useAppConfigStore = create<AppConfigStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          appConfig: initialAppConfigState,
          setAppConfig: (appConfig: AppConfig) =>
            set((state) => {
              state.appConfig = appConfig;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useAppConfigStore;

interface AppConfigStore {
  appConfig: AppConfig | null;
  setAppConfig: (appConfig: AppConfig) => void;
}
