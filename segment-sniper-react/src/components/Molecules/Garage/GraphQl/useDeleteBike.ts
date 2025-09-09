import * as Apollo from '@apollo/client';
import DeleteBikes from './deleteBikes.graphql';
import {
  RootMutation,
  GarageMutationsDeleteBikesArgs,
} from '../../../../graphql/generated';

export function useDeleteBikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsDeleteBikesArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsDeleteBikesArgs
  >(DeleteBikes, options);
}
