import * as Apollo from '@apollo/client';
import {
  GarageMutationsImportGarageArgs,
  RootMutation,
} from '../../../../../graphql/generated';
import ImportGarage from './ImportGarage.graphql';

export function useImportGarage(
  baseOptions?: Apollo.MutationHookOptions<
    { garage: RootMutation['garage'] },
    GarageMutationsImportGarageArgs
  >
) {
  const options = { ...baseOptions };
  return Apollo.useMutation<
    { garage: RootMutation['garage'] },
    GarageMutationsImportGarageArgs
  >(ImportGarage, options);
}
