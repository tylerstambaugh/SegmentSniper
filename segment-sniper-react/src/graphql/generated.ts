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

export type BikeInput = {
  /** The Id of the user the bike belongs to */
  bikeId?: InputMaybe<Scalars['ID']['input']>;
  /** The brand of the bike */
  brandName?: InputMaybe<Scalars['String']['input']>;
  /** The description of the bike */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The enum value of the frame type */
  frameType: FrameTypeEnum;
  /** The odometer of the bike in meters */
  metersLogged?: InputMaybe<Scalars['Float']['input']>;
  /** The model of the bike */
  modelName?: InputMaybe<Scalars['String']['input']>;
  /** The name of the bike */
  name: Scalars['String']['input'];
  /** The Id of the user the bike belongs to */
  userId?: InputMaybe<Scalars['ID']['input']>;
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
  /** Retrieve all bikes for a user */
  byAuthUserId?: Maybe<Array<Maybe<BikeModel>>>;
  /** Retrieve a bike by its Id */
  byBikeId?: Maybe<BikeModel>;
};


export type BikeQueriesByAuthUserIdArgs = {
  authUserId: Scalars['ID']['input'];
};


export type BikeQueriesByBikeIdArgs = {
  bikeId: Scalars['ID']['input'];
};

export type DeleteResult = {
  __typename?: 'DeleteResult';
  /** Indicates if the deletion was successful. */
  success: Scalars['Boolean']['output'];
};

export type EquipmentInput = {
  /** The description of the equipment. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The Id of the equipment, used for updating existing equipment */
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  /** The installation date of the equipment. */
  installDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The miles on the equipment when it was added to this bike */
  milesAtInstall: Scalars['Decimal']['input'];
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
  /** The miles logged on the equipment */
  totalMiles: Scalars['Decimal']['input'];
  /** The installation date of the updated. */
  updatedDate?: InputMaybe<Scalars['DateTime']['input']>;
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
  /** The miles on the equipment when it was added to this bike */
  milesAtInstall?: Maybe<Scalars['Decimal']['output']>;
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
  /** Total miles on the equipment */
  totalMiles?: Maybe<Scalars['Decimal']['output']>;
  /** The date the equipment was last updated */
  updatedDate?: Maybe<Scalars['DateTime']['output']>;
};

/** The type of bike frame. */
export enum FrameTypeEnum {
  Cross = 'CROSS',
  Ebike = 'EBIKE',
  Gravel = 'GRAVEL',
  Mtb = 'MTB',
  None = 'NONE',
  Other = 'OTHER',
  Road = 'ROAD',
  TimeTrial = 'TIME_TRIAL'
}

export type GarageMutations = {
  __typename?: 'GarageMutations';
  deleteBikes?: Maybe<DeleteResult>;
  deleteEquipment?: Maybe<BikeModel>;
  /** Updates the bikes in the user's garage. */
  importGarage?: Maybe<Array<Maybe<BikeModel>>>;
  retireEquipmentOnBike?: Maybe<BikeModel>;
  upsertBike?: Maybe<BikeModel>;
  upsertBikeEquipment?: Maybe<BikeModel>;
};


export type GarageMutationsDeleteBikesArgs = {
  bikeIds: Array<InputMaybe<Scalars['ID']['input']>>;
  userId: Scalars['ID']['input'];
};


export type GarageMutationsDeleteEquipmentArgs = {
  equipmentId: Scalars['ID']['input'];
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


export type GarageMutationsUpsertBikeArgs = {
  bike: BikeInput;
  userId: Scalars['ID']['input'];
};


export type GarageMutationsUpsertBikeEquipmentArgs = {
  bikeId: Scalars['ID']['input'];
  equipment: EquipmentInput;
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

export type DeleteEquipmentMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  equipmentId: Scalars['ID']['input'];
}>;


export type DeleteEquipmentMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', deleteEquipment?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, totalMiles?: number | null, milesAtInstall?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null, updatedDate?: string | null } | null> | null } | null } | null };

export type RetireEquipmentOnBikeMutationVariables = Exact<{
  bikeId: Scalars['ID']['input'];
  equipmentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  retireDate: Scalars['Date']['input'];
}>;


export type RetireEquipmentOnBikeMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', retireEquipmentOnBike?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, totalMiles?: number | null, milesAtInstall?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null } | null };

export type UpsertBikeEquipmentMutationVariables = Exact<{
  bikeId: Scalars['ID']['input'];
  equipment: EquipmentInput;
  userId: Scalars['ID']['input'];
}>;


export type UpsertBikeEquipmentMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', upsertBikeEquipment?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, installDate?: string | null, totalMiles?: number | null, milesUntilReplaceReminder?: number | null, price?: number | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null } | null };

export type DeleteBikesMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  bikeIds: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteBikesMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', deleteBikes?: { __typename?: 'DeleteResult', success: boolean } | null } | null };

export type GetBikeByIdQueryVariables = Exact<{
  bikeId: Scalars['ID']['input'];
}>;


export type GetBikeByIdQuery = { __typename?: 'RootQuery', bikes?: { __typename?: 'BikeQueries', byBikeId?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, totalMiles?: number | null, milesAtInstall?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null } | null };

export type GetBikesByAuthUserIdQueryVariables = Exact<{
  authUserId: Scalars['ID']['input'];
}>;


export type GetBikesByAuthUserIdQuery = { __typename?: 'RootQuery', bikes?: { __typename?: 'BikeQueries', byAuthUserId?: Array<{ __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, totalMiles?: number | null, milesAtInstall?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null> | null } | null };

export type ImportGarageMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ImportGarageMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', importGarage?: Array<{ __typename?: 'BikeModel', bikeId: string, name?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null, equipment?: Array<{ __typename?: 'EquipmentModel', equipmentId: string, name: string, description?: string | null, totalMiles?: number | null, milesAtInstall?: number | null, price?: number | null, installDate?: string | null, replaceAtMiles?: number | null, retiredDate?: string | null } | null> | null } | null> | null } | null };

export type UpsertBikeMutationVariables = Exact<{
  bike: BikeInput;
  userId: Scalars['ID']['input'];
}>;


export type UpsertBikeMutation = { __typename?: 'RootMutation', garage?: { __typename?: 'GarageMutations', upsertBike?: { __typename?: 'BikeModel', bikeId: string, name?: string | null, description?: string | null, brandName?: string | null, modelName?: string | null, frameType?: number | null, metersLogged?: number | null } | null } | null };


export const DeleteEquipmentDocument = gql`
    mutation DeleteEquipment($userId: ID!, $equipmentId: ID!) {
  garage {
    deleteEquipment(userId: $userId, equipmentId: $equipmentId) {
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
        totalMiles
        milesAtInstall
        price
        installDate
        replaceAtMiles
        retiredDate
        updatedDate
      }
    }
  }
}
    `;
export type DeleteEquipmentMutationFn = Apollo.MutationFunction<DeleteEquipmentMutation, DeleteEquipmentMutationVariables>;

/**
 * __useDeleteEquipmentMutation__
 *
 * To run a mutation, you first call `useDeleteEquipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEquipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEquipmentMutation, { data, loading, error }] = useDeleteEquipmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      equipmentId: // value for 'equipmentId'
 *   },
 * });
 */
export function useDeleteEquipmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEquipmentMutation, DeleteEquipmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEquipmentMutation, DeleteEquipmentMutationVariables>(DeleteEquipmentDocument, options);
      }
export type DeleteEquipmentMutationHookResult = ReturnType<typeof useDeleteEquipmentMutation>;
export type DeleteEquipmentMutationResult = Apollo.MutationResult<DeleteEquipmentMutation>;
export type DeleteEquipmentMutationOptions = Apollo.BaseMutationOptions<DeleteEquipmentMutation, DeleteEquipmentMutationVariables>;
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
        totalMiles
        milesAtInstall
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
export const UpsertBikeEquipmentDocument = gql`
    mutation UpsertBikeEquipment($bikeId: ID!, $equipment: EquipmentInput!, $userId: ID!) {
  garage {
    upsertBikeEquipment(bikeId: $bikeId, equipment: $equipment, userId: $userId) {
      bikeId
      name
      equipment {
        equipmentId
        name
        description
        installDate
        totalMiles
        milesUntilReplaceReminder
        price
        replaceAtMiles
        retiredDate
      }
    }
  }
}
    `;
export type UpsertBikeEquipmentMutationFn = Apollo.MutationFunction<UpsertBikeEquipmentMutation, UpsertBikeEquipmentMutationVariables>;

/**
 * __useUpsertBikeEquipmentMutation__
 *
 * To run a mutation, you first call `useUpsertBikeEquipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertBikeEquipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertBikeEquipmentMutation, { data, loading, error }] = useUpsertBikeEquipmentMutation({
 *   variables: {
 *      bikeId: // value for 'bikeId'
 *      equipment: // value for 'equipment'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpsertBikeEquipmentMutation(baseOptions?: Apollo.MutationHookOptions<UpsertBikeEquipmentMutation, UpsertBikeEquipmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertBikeEquipmentMutation, UpsertBikeEquipmentMutationVariables>(UpsertBikeEquipmentDocument, options);
      }
export type UpsertBikeEquipmentMutationHookResult = ReturnType<typeof useUpsertBikeEquipmentMutation>;
export type UpsertBikeEquipmentMutationResult = Apollo.MutationResult<UpsertBikeEquipmentMutation>;
export type UpsertBikeEquipmentMutationOptions = Apollo.BaseMutationOptions<UpsertBikeEquipmentMutation, UpsertBikeEquipmentMutationVariables>;
export const DeleteBikesDocument = gql`
    mutation DeleteBikes($userId: ID!, $bikeIds: [ID]!) {
  garage {
    deleteBikes(userId: $userId, bikeIds: $bikeIds) {
      success
    }
  }
}
    `;
export type DeleteBikesMutationFn = Apollo.MutationFunction<DeleteBikesMutation, DeleteBikesMutationVariables>;

/**
 * __useDeleteBikesMutation__
 *
 * To run a mutation, you first call `useDeleteBikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBikesMutation, { data, loading, error }] = useDeleteBikesMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      bikeIds: // value for 'bikeIds'
 *   },
 * });
 */
export function useDeleteBikesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBikesMutation, DeleteBikesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBikesMutation, DeleteBikesMutationVariables>(DeleteBikesDocument, options);
      }
export type DeleteBikesMutationHookResult = ReturnType<typeof useDeleteBikesMutation>;
export type DeleteBikesMutationResult = Apollo.MutationResult<DeleteBikesMutation>;
export type DeleteBikesMutationOptions = Apollo.BaseMutationOptions<DeleteBikesMutation, DeleteBikesMutationVariables>;
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
        totalMiles
        milesAtInstall
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
export const GetBikesByAuthUserIdDocument = gql`
    query GetBikesByAuthUserId($authUserId: ID!) {
  bikes {
    byAuthUserId(authUserId: $authUserId) {
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
        totalMiles
        milesAtInstall
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
 * __useGetBikesByAuthUserIdQuery__
 *
 * To run a query within a React component, call `useGetBikesByAuthUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBikesByAuthUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBikesByAuthUserIdQuery({
 *   variables: {
 *      authUserId: // value for 'authUserId'
 *   },
 * });
 */
export function useGetBikesByAuthUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables> & ({ variables: GetBikesByAuthUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>(GetBikesByAuthUserIdDocument, options);
      }
export function useGetBikesByAuthUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>(GetBikesByAuthUserIdDocument, options);
        }
export function useGetBikesByAuthUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>(GetBikesByAuthUserIdDocument, options);
        }
export type GetBikesByAuthUserIdQueryHookResult = ReturnType<typeof useGetBikesByAuthUserIdQuery>;
export type GetBikesByAuthUserIdLazyQueryHookResult = ReturnType<typeof useGetBikesByAuthUserIdLazyQuery>;
export type GetBikesByAuthUserIdSuspenseQueryHookResult = ReturnType<typeof useGetBikesByAuthUserIdSuspenseQuery>;
export type GetBikesByAuthUserIdQueryResult = Apollo.QueryResult<GetBikesByAuthUserIdQuery, GetBikesByAuthUserIdQueryVariables>;
export const ImportGarageDocument = gql`
    mutation ImportGarage($userId: ID!) {
  garage {
    importGarage(userId: $userId) {
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
        totalMiles
        milesAtInstall
        price
        installDate
        replaceAtMiles
        retiredDate
      }
    }
  }
}
    `;
export type ImportGarageMutationFn = Apollo.MutationFunction<ImportGarageMutation, ImportGarageMutationVariables>;

/**
 * __useImportGarageMutation__
 *
 * To run a mutation, you first call `useImportGarageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportGarageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importGarageMutation, { data, loading, error }] = useImportGarageMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useImportGarageMutation(baseOptions?: Apollo.MutationHookOptions<ImportGarageMutation, ImportGarageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportGarageMutation, ImportGarageMutationVariables>(ImportGarageDocument, options);
      }
export type ImportGarageMutationHookResult = ReturnType<typeof useImportGarageMutation>;
export type ImportGarageMutationResult = Apollo.MutationResult<ImportGarageMutation>;
export type ImportGarageMutationOptions = Apollo.BaseMutationOptions<ImportGarageMutation, ImportGarageMutationVariables>;
export const UpsertBikeDocument = gql`
    mutation UpsertBike($bike: BikeInput!, $userId: ID!) {
  garage {
    upsertBike(bike: $bike, userId: $userId) {
      bikeId
      name
      description
      brandName
      modelName
      frameType
      metersLogged
    }
  }
}
    `;
export type UpsertBikeMutationFn = Apollo.MutationFunction<UpsertBikeMutation, UpsertBikeMutationVariables>;

/**
 * __useUpsertBikeMutation__
 *
 * To run a mutation, you first call `useUpsertBikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertBikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertBikeMutation, { data, loading, error }] = useUpsertBikeMutation({
 *   variables: {
 *      bike: // value for 'bike'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpsertBikeMutation(baseOptions?: Apollo.MutationHookOptions<UpsertBikeMutation, UpsertBikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertBikeMutation, UpsertBikeMutationVariables>(UpsertBikeDocument, options);
      }
export type UpsertBikeMutationHookResult = ReturnType<typeof useUpsertBikeMutation>;
export type UpsertBikeMutationResult = Apollo.MutationResult<UpsertBikeMutation>;
export type UpsertBikeMutationOptions = Apollo.BaseMutationOptions<UpsertBikeMutation, UpsertBikeMutationVariables>;