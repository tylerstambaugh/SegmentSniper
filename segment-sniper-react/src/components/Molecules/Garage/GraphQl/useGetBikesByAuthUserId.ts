import * as Apollo from '@apollo/client';
import {
  GetBikesByAuthUserIdQuery,
  GetBikesByAuthUserIdQueryVariables,
} from '../../../../graphql/generated';
import GetBikesByAuthUserId from './GetBikesByAuthUserId.graphql';

export function useGetBikesByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBikesByAuthUserIdQuery,
    GetBikesByAuthUserIdQueryVariables
  > &
    (
      | { variables: GetBikesByAuthUserIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...baseOptions };
  return Apollo.useQuery<
    GetBikesByAuthUserIdQuery,
    GetBikesByAuthUserIdQueryVariables
  >(GetBikesByAuthUserId, options);
}
export function useGetBikesByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBikesByAuthUserIdQuery,
    GetBikesByAuthUserIdQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useLazyQuery<
    GetBikesByAuthUserIdQuery,
    GetBikesByAuthUserIdQueryVariables
  >(GetBikesByAuthUserId, options);
}
export function useGetBikesByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetBikesByAuthUserIdQuery,
        GetBikesByAuthUserIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBikesByAuthUserIdQuery,
    GetBikesByAuthUserIdQueryVariables
  >(GetBikesByAuthUserId, options);
}
