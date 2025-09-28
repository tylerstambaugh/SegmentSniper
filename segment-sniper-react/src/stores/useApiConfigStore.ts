import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const persistOptions = {
  name: 'api-config-store',
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  enabled: true,
  name: 'Api Config Store',
};

export type ApiConfig = {
  baseRestApiUrl: string;
  baseGraphqlUrl: string;
};

interface ApiConfigStore {
  apiConfig: ApiConfig | null;
}

const useApiConfigStore = create<ApiConfigStore>()(
  immer(
    devtools(
      persist((set) => {
        const baseRestApiUrl: string =
          import.meta.env.VITE_SEGMENT_SNIPER_API_URL ||
          'https://localhost:44351/api';
        const baseGraphqlUrl: string =
          import.meta.env.VITE_SEGMENT_SNIPER_GRAPHQL_URL ||
          'https://localhost:44351/graphql';

        const initialApiConfigState: ApiConfig = {
          baseRestApiUrl,
          baseGraphqlUrl,
        };

        return {
          apiConfig: initialApiConfigState,
        };
      }, persistOptions),
      devtoolOptions
    )
  )
);

export default useApiConfigStore;

// import { create } from 'zustand';
// import { createJSONStorage, devtools, persist } from 'zustand/middleware';
// import { immer } from 'zustand/middleware/immer';

// const persistOptions = {
//   name: 'api-config-store',
//   storage: createJSONStorage(() => sessionStorage),
// };

// const devtoolOptions = {
//   enabled: true,
//   name: 'Api Config Store',
// };

// export type ApiConfig = {
//   baseRestApiUrl: string;
//   baseGraphqlUrl: string;
// };

// const useApiConfigStore = create<ApiConfigStore>()(
//   immer(
//     devtools(
//       persist((set) => {
//         const baseRestApiUrl = import.meta.env.VITE_SEGMENT_SNIPER_API_URL;
//         const baseGraphqlUrl = import.meta.env.VITE_SEGMENT_SNIPER_GRAPHQL_URL;
//         const initialApiConfigState: ApiConfig = {
//           baseRestApiUrl: baseRestApiUrl || 'https://localhost:44351/api',
//           baseGraphqlUrl: baseGraphqlUrl || 'https://localhost:44351/graphql',
//         };

//         return {
//           apiConfig: initialApiConfigState,
//         };
//       }, persistOptions),
//       devtoolOptions
//     )
//   )
// );

// export default useApiConfigStore;

// interface ApiConfigStore {
//   apiConfig: ApiConfig | null;
// }
