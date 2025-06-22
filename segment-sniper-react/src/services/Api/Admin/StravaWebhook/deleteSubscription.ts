import { ApiContract } from '../../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../../ApiCommon/UnsuccessfulHttpResponseError';
import { apiDelete } from '../../BaseApiService';

export type DeleteSubscriptionRequest = {
  subscriptionId: string;
};
export type DeleteSubscriptionResponse = {
  success: boolean;
};

export default async function deleteSubscription(
  contract: ApiContract<DeleteSubscriptionRequest>
) {
  try {
    const respone = apiDelete<
      DeleteSubscriptionRequest,
      DeleteSubscriptionResponse
    >(`${contract.baseUrl}/webhook/deleteSubscription`, contract);
    return respone;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
