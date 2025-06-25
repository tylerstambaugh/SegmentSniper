import { ApiContract } from '../../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../../ApiCommon/UnsuccessfulHttpResponseError';
import { apiDeleteNoRequest } from '../../BaseApiService';

export type DeleteSubscriptionResponse = {
  success: boolean;
};

export default async function deleteSubscription(contract: ApiContract) {
  try {
    const respone = apiDeleteNoRequest<DeleteSubscriptionResponse>(
      `${contract.baseUrl}/webhook/deleteSubscription`,
      contract
    );
    return respone;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
