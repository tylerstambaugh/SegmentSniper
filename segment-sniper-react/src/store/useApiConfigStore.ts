import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const persistOptions = {
  name: "api-config-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Api Config Store",
};

const useApiConfigStore = create<ApiConfigStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          apiConfig: initialApiConfigState,
          setTokenData: (apiConfig: ApiConfig) =>
            set((state) => {
              state.apiConfig = apiConfig;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useApiConfigStore;

interface ApiConfigStore {
  apiConfig: ApiConfig | null;
}

export type ApiConfig = {
  baseUrl: string;
};

export const initialApiConfigState: ApiConfig = {
  baseUrl: "https://localhost:44351/api",
};
