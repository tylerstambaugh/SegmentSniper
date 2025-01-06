import * as Apollo from '@apollo/client';
import {
  GetBikesByUserIdQuery,
  GetBikesByUserIdQueryVariables,
} from '../../../../graphql/generated';
import GetBikesByUserId from './GetBikesByUserId.graphql';

export function useGetBikesByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBikesByUserIdQuery,
    GetBikesByUserIdQueryVariables
  > &
    (
      | { variables: GetBikesByUserIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...baseOptions };
  return Apollo.useQuery<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>(
    GetBikesByUserId,
    options
  );
}
export function useGetBikesByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBikesByUserIdQuery,
    GetBikesByUserIdQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useLazyQuery<
    GetBikesByUserIdQuery,
    GetBikesByUserIdQueryVariables
  >(GetBikesByUserId, options);
}
export function useGetBikesByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetBikesByUserIdQuery,
        GetBikesByUserIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBikesByUserIdQuery,
    GetBikesByUserIdQueryVariables
  >(GetBikesByUserId, options);
}
