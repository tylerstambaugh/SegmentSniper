import * as Apollo from '@apollo/client';
import {
  RootMutation,
} from '../../../../../graphql/generated';
import ImportGarage from './ImportGarage.graphql';

export function useImportGarage(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] }
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] }
  >(ImportGarage, options);
}
