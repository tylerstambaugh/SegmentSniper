import { ApiContract } from '../../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../../BaseApiService';

export type CreateSubscriptionRequest = Record<string, never>;
export type CreateSubscriptionResponse = {
  success: boolean;
  error?: string;
};

export default async function getCreateSubscription(
  contract: ApiContract<CreateSubscriptionRequest>
) {
  try {
    const response = apiGet<CreateSubscriptionResponse>(
      `${contract.baseUrl}/webhook/initiate`,
      contract
    );

    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
