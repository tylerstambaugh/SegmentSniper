import * as Apollo from '@apollo/client';
import RetireEquipmentOnBike from './RetireBikeEquipment.graphql';
import {
  RootMutation,
  GarageMutationsRetireEquipmentOnBikeArgs,
} from '../../../../../../graphql/generated';

export function useRetireBikeEquipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsRetireEquipmentOnBikeArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsRetireEquipmentOnBikeArgs
  >(RetireEquipmentOnBike, options);
}
