import * as Apollo from '@apollo/client';
import AddEquipmentToBike from './AddEquipmentToBike.graphql';
import {
  RootMutation,
  GarageMutationsAddEquipmentToBikeArgs,
} from '../../../../../../graphql/generated';

export function useAddEquipmentToBikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsAddEquipmentToBikeArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsAddEquipmentToBikeArgs
  >(AddEquipmentToBike, options);
}
