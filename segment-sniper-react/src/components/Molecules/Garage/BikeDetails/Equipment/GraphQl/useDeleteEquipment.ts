import * as Apollo from '@apollo/client';
import DeleteEquipment from './deleteEquipment.graphql';
import {
  RootMutation,
  GarageMutationsDeleteEquipmentArgs,
} from '../../../../../../graphql/generated';

export function useDeleteEquipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsDeleteEquipmentArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsDeleteEquipmentArgs
  >(DeleteEquipment, options);
}
