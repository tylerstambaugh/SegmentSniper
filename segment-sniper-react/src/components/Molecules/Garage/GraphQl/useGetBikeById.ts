import * as Apollo from '@apollo/client';
import {
  GetBikeByIdQuery,
  GetBikeByIdQueryVariables,
} from '../../../../graphql/generated';
import GetBikeById from './GetBikeById.graphql';

// const GetBikeByIdDocument = gql`
//   query GetBikeById($bikeId: ID!) {
//     bikes {
//       byBikeId(bikeId: $bikeId) {
//         bikeId
//         name
//         brandName
//         modelName
//         frameType
//         metersLogged
//       }
//     }
//   }
// `;

export function useGetBikeByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBikeByIdQuery,
    GetBikeByIdQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useQuery<GetBikeByIdQuery, GetBikeByIdQueryVariables>(
    GetBikeById,
    options
  );
}

export function useGetBikeByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBikeByIdQuery,
    GetBikeByIdQueryVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useLazyQuery<GetBikeByIdQuery, GetBikeByIdQueryVariables>(
    GetBikeById,
    options
  );
}
