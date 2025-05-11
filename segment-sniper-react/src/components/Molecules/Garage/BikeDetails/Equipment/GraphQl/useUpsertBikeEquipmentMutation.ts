import * as Apollo from '@apollo/client';
import UpsertBikeEquipment from './upsertBikeEquipment.graphql';
import {
  RootMutation,
  GarageMutationsUpsertBikeEquipmentArgs,
} from '../../../../../../graphql/generated';

export function useUpsertBikeEquipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsUpsertBikeEquipmentArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsUpsertBikeEquipmentArgs
  >(UpsertBikeEquipment, options);
}
