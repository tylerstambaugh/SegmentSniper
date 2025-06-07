import { ApiContract } from '../../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../../BaseApiService';

export type CreateSubscriptionRequest = Record<string, never>;
export type CreateSubscriptionResponse = {
  success: boolean;
};

export default async function getCreateSubscription(
  contract: ApiContract<CreateSubscriptionRequest>
) {
  try {
    const respone = apiGet<CreateSubscriptionResponse>(
      `${contract.baseUrl}/webhook/initiate`,
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
