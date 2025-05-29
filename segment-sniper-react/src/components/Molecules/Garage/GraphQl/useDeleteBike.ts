import * as Apollo from '@apollo/client';
import DeleteBike from './deleteBike.graphql';
import {
  RootMutation,
  GarageMutationsDeleteBikeArgs,
} from '../../../../graphql/generated';

export function useDeleteBikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsDeleteBikeArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsDeleteBikeArgs
  >(DeleteBike, options);
}
