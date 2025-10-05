import * as Apollo from "@apollo/client";
import {
  GetBikesByAuthUserIdQuery,
} from "../../../../graphql/generated";
import GetBikesByAuthUserId from "./GetBikesByAuthUserId.graphql";

export function useGetBikesByUserIdQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBikesByAuthUserIdQuery>
) {
  return Apollo.useQuery<GetBikesByAuthUserIdQuery>(
    GetBikesByAuthUserId,
    baseOptions
  );
}

export function useGetBikesByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBikesByAuthUserIdQuery>
) {
  return Apollo.useLazyQuery<GetBikesByAuthUserIdQuery>(
    GetBikesByAuthUserId,
    baseOptions
  );
}

export function useGetBikesByUserIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetBikesByAuthUserIdQuery>
) {
  return Apollo.useSuspenseQuery<GetBikesByAuthUserIdQuery>(
    GetBikesByAuthUserId,
    baseOptions
  );
}
