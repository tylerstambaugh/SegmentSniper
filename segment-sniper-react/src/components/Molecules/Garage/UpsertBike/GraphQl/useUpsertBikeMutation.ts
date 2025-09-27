import * as Apollo from '@apollo/client';
import UpsertBike from './UpsertBike.graphql';
import {
  RootMutation,
  GarageMutationsUpsertBikeArgs,
} from '../../../../../graphql/generated';

export function useUpsertBikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsUpsertBikeArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsUpsertBikeArgs
  >(UpsertBike, options);
}
