import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: string; output: string; }
  Decimal: { input: number; output: number; }
};

/** A bike in the collection */
export type BikeModel = {
  __typename?: 'BikeModel';
  /** Id of the bike */
  bikeId: Scalars['String']['output'];
  /** The brand of the bike */
  brandName?: Maybe<Scalars['String']['output']>;
  /** A description of the bike */
  description?: Maybe<Scalars['String']['output']>;
  /** List of equipment on the bike. */
  equipment?: Maybe<Array<Maybe<EquipmentModel>>>;
  /** Int representation of the frame type of the bike, maps to FrameTypeEnum */
  frameType?: Maybe<Scalars['Int']['output']>;
  /** If the bike is the primary equipment for the athlete */
  isPrimary?: Maybe<Scalars['Boolean']['output']>;
  /** How many miles have been logged on the bike */
  metersLogged?: Maybe<Scalars['Decimal']['output']>;
  /** Themodel of the bike */
  modelName?: Maybe<Scalars['String']['output']>;
  /** The name of the bike */
  name?: Maybe<Scalars['String']['output']>;
  /** The UserId of the bike owner */
  userId?: Maybe<Scalars['String']['output']>;
};

export type BikeQueries = {
  __typename?: 'BikeQueries';
  /** Retrieve a bike by its Id */
  byBikeId?: Maybe<BikeModel>;
  /** Retrieve all bikes for a user */
  byUserId?: Maybe<Array<Maybe<BikeModel>>>;
};


export type BikeQueriesByBikeIdArgs = {
  bikeId: Scalars['ID']['input'];
};


export type BikeQueriesByUserIdArgs = {
  userId: Scalars['ID']['input'];
};

export type EquipmentInput = {
  /** The description of the equipment. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The installation date of the equipment. */
  installDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The miles logged on the equipment */
  milesLogged: Scalars['Decimal']['input'];
  /** Miles until a reminder to replace the equipment is sent */
  milesUntilReplaceReminder: Scalars['Int']['input'];
  /** The name of the equipment. */
  name: Scalars['String']['input'];
  /** The price of the equipment. */
  price: Scalars['Decimal']['input'];
  /** The sum total of miles that the equipment should be replaced */
  replaceAtMiles: Scalars['Int']['input'];
  /** The date the equipment was retired */
  retiredDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A piece of equipment belonging to a bike */
export type EquipmentModel = {
  __typename?: 'EquipmentModel';
  /** The description of the piece of equipment */
  description?: Maybe<Scalars['String']['output']>;
  /** The id of the piece of equipment */
  equipmentId: Scalars['ID']['output'];
  /** The date the equipment was installed */
  installDate?: Maybe<Scalars['DateTime']['output']>;
  /** The miles logged on the equipment */
  milesLogged?: Maybe<Scalars['Decimal']['output']>;
  /** Miles until a reminder to replace the equipment is sent */
  milesUntilReplaceReminder?: Maybe<Scalars['Int']['output']>;
  /** The name of the piece of equipment */
  name: Scalars['String']['output'];
  /** The amount paid for the equipment */
  price?: Maybe<Scalars['Decimal']['output']>;
  /** The sum total of miles that the equipment should be replaced */
  replaceAtMiles?: Maybe<Scalars['Int']['output']>;
  /** The date the equipment was retired */
  retiredDate?: Maybe<Scalars['DateTime']['output']>;
};

export type GarageMutations = {
  __typename?: 'GarageMutations';
  addEquipmentToBike?: Maybe<BikeModel>;
  /** Updates the bikes in the user's garage. */
  importGarage?: Maybe<Array<Maybe<BikeModel>>>;
  retireEquipmentOnBike?: Maybe<BikeModel>;
};


export type GarageMutationsAddEquipmentToBikeArgs = {
  bikeId: Scalars['ID']['input'];
  equipment: EquipmentInput;
  userId: Scalars['ID']['input'];
};


export type GarageMutationsImportGarageArgs = {
  userId: Scalars['ID']['input'];
};


export type GarageMutationsRetireEquipmentOnBikeArgs = {
  bikeId: Scalars['ID']['input'];
  equipmentId: Scalars['ID']['input'];
  retireDate: Scalars['Date']['input'];
  userId: Scalars['ID']['input'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  /** Add or update bikes and equipment */
  garage?: Maybe<GarageMutations>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  /** Bike related queries */
  bikes?: Maybe<BikeQueries>;
};

export type AddEquipmentToBikeMutationVariables = Exact<{
  bikeId: Scalars['ID']['input'];
  equipment: EquipmentInput;
  userId: Scalars['ID']['input'];
}>;


export type AddEquipmentToBikeMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', addEquipmentToBike?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, installDate?: string | null, milesLogged?: number | null, milesUntilReplaceReminder?: number | null, price?: number | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null } | null };

export type RetireEquipmentOnBikeMutationVariables = Exact<{
  bikeId: Scalars['ID']['input'];
  equipmentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  retireDate: Scalars['Date']['input'];
}>;


export type RetireEquipmentOnBikeMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', retireEquipmentOnBike?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, milesLogged?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null } | null };

export type GetBikeByIdQueryVariables = Exact<{
  bikeId: Scalars['ID']['input'];
}>;


export type GetBikeByIdQuery = { __typename?: 'RootQuery', bikes?: { __typename?: 'BikeQueries', byBikeId?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, milesLogged?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null } | null };

export type GetBikesByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetBikesByUserIdQuery = { __typename?: 'RootQuery', bikes?: { __typename?: 'BikeQueries', byUserId?: Array<{ __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, milesLogged?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null> | null } | null };


export const AddEquipmentToBikeDocument = gql`
    mutation AddEquipmentToBike($bikeId: ID!, $equipment: EquipmentInput!, $userId: ID!) {
  garage {
    addEquipmentToBike(bikeId: $bikeId, equipment: $equipment, userId: $userId) {
      bikeId
      name
      equipment {
        equipmentId
        name
        description
        installDate
        milesLogged
        milesUntilReplaceReminder
        price
        replaceAtMiles
        retiredDate
      }
    }
  }
}
    `;
export type AddEquipmentToBikeMutationFn = Apollo.MutationFunction<AddEquipmentToBikeMutation, AddEquipmentToBikeMutationVariables>;

/**
 * __useAddEquipmentToBikeMutation__
 *
 * To run a mutation, you first call `useAddEquipmentToBikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEquipmentToBikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEquipmentToBikeMutation, { data, loading, error }] = useAddEquipmentToBikeMutation({
 *   variables: {
 *      bikeId: // value for 'bikeId'
 *      equipment: // value for 'equipment'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddEquipmentToBikeMutation(baseOptions?: Apollo.MutationHookOptions<AddEquipmentToBikeMutation, AddEquipmentToBikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEquipmentToBikeMutation, AddEquipmentToBikeMutationVariables>(AddEquipmentToBikeDocument, options);
      }
export type AddEquipmentToBikeMutationHookResult = ReturnType<typeof useAddEquipmentToBikeMutation>;
export type AddEquipmentToBikeMutationResult = Apollo.MutationResult<AddEquipmentToBikeMutation>;
export type AddEquipmentToBikeMutationOptions = Apollo.BaseMutationOptions<AddEquipmentToBikeMutation, AddEquipmentToBikeMutationVariables>;
export const RetireEquipmentOnBikeDocument = gql`
    mutation RetireEquipmentOnBike($bikeId: ID!, $equipmentId: ID!, $userId: ID!, $retireDate: Date!) {
  garage {
    retireEquipmentOnBike(
      bikeId: $bikeId
      equipmentId: $equipmentId
      userId: $userId
      retireDate: $retireDate
    ) {
      bikeId
      name
      brandName
      modelName
      frameType
      metersLogged
      equipment {
        equipmentId
        name
        description
        milesLogged
        price
        installDate
        replaceAtMiles
        retiredDate
      }
    }
  }
}
    `;
export type RetireEquipmentOnBikeMutationFn = Apollo.MutationFunction<RetireEquipmentOnBikeMutation, RetireEquipmentOnBikeMutationVariables>;

/**
 * __useRetireEquipmentOnBikeMutation__
 *
 * To run a mutation, you first call `useRetireEquipmentOnBikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRetireEquipmentOnBikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [retireEquipmentOnBikeMutation, { data, loading, error }] = useRetireEquipmentOnBikeMutation({
 *   variables: {
 *      bikeId: // value for 'bikeId'
 *      equipmentId: // value for 'equipmentId'
 *      userId: // value for 'userId'
 *      retireDate: // value for 'retireDate'
 *   },
 * });
 */
export function useRetireEquipmentOnBikeMutation(baseOptions?: Apollo.MutationHookOptions<RetireEquipmentOnBikeMutation, RetireEquipmentOnBikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RetireEquipmentOnBikeMutation, RetireEquipmentOnBikeMutationVariables>(RetireEquipmentOnBikeDocument, options);
      }
export type RetireEquipmentOnBikeMutationHookResult = ReturnType<typeof useRetireEquipmentOnBikeMutation>;
export type RetireEquipmentOnBikeMutationResult = Apollo.MutationResult<RetireEquipmentOnBikeMutation>;
export type RetireEquipmentOnBikeMutationOptions = Apollo.BaseMutationOptions<RetireEquipmentOnBikeMutation, RetireEquipmentOnBikeMutationVariables>;
export const GetBikeByIdDocument = gql`
    query GetBikeById($bikeId: ID!) {
  bikes {
    byBikeId(bikeId: $bikeId) {
      bikeId
      name
      brandName
      modelName
      frameType
      metersLogged
      equipment {
        equipmentId
        name
        description
        milesLogged
        price
        installDate
        replaceAtMiles
        retiredDate
      }
    }
  }
}
    `;

/**
 * __useGetBikeByIdQuery__
 *
 * To run a query within a React component, call `useGetBikeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBikeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBikeByIdQuery({
 *   variables: {
 *      bikeId: // value for 'bikeId'
 *   },
 * });
 */
export function useGetBikeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBikeByIdQuery, GetBikeByIdQueryVariables> & ({ variables: GetBikeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBikeByIdQuery, GetBikeByIdQueryVariables>(GetBikeByIdDocument, options);
      }
export function useGetBikeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBikeByIdQuery, GetBikeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBikeByIdQuery, GetBikeByIdQueryVariables>(GetBikeByIdDocument, options);
        }
export function useGetBikeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBikeByIdQuery, GetBikeByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBikeByIdQuery, GetBikeByIdQueryVariables>(GetBikeByIdDocument, options);
        }
export type GetBikeByIdQueryHookResult = ReturnType<typeof useGetBikeByIdQuery>;
export type GetBikeByIdLazyQueryHookResult = ReturnType<typeof useGetBikeByIdLazyQuery>;
export type GetBikeByIdSuspenseQueryHookResult = ReturnType<typeof useGetBikeByIdSuspenseQuery>;
export type GetBikeByIdQueryResult = Apollo.QueryResult<GetBikeByIdQuery, GetBikeByIdQueryVariables>;
export const GetBikesByUserIdDocument = gql`
    query GetBikesByUserId($userId: ID!) {
  bikes {
    byUserId(userId: $userId) {
      bikeId
      name
      brandName
      modelName
      frameType
      metersLogged
      equipment {
        equipmentId
        name
        description
        milesLogged
        price
        installDate
        replaceAtMiles
        retiredDate
      }
    }
  }
}
    `;

/**
 * __useGetBikesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetBikesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBikesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBikesByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBikesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables> & ({ variables: GetBikesByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>(GetBikesByUserIdDocument, options);
      }
export function useGetBikesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>(GetBikesByUserIdDocument, options);
        }
export function useGetBikesByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>(GetBikesByUserIdDocument, options);
        }
export type GetBikesByUserIdQueryHookResult = ReturnType<typeof useGetBikesByUserIdQuery>;
export type GetBikesByUserIdLazyQueryHookResult = ReturnType<typeof useGetBikesByUserIdLazyQuery>;
export type GetBikesByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetBikesByUserIdSuspenseQuery>;
export type GetBikesByUserIdQueryResult = Apollo.QueryResult<GetBikesByUserIdQuery, GetBikesByUserIdQueryVariables>;