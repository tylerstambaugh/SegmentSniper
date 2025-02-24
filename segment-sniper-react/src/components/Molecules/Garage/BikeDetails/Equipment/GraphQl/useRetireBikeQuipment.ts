import * as Apollo from '@apollo/client';
import RetireBikeEquipment from './RetireBikeQuipment.graphql';
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
  >(RetireBikeEquipment, options);
}
