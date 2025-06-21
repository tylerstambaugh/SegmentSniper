import { ApiContract } from '../../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../../BaseApiService';

export type ViewSubscriptionRequest = Record<string, never>;
export type ViewSubscriptionResponse = {
  success: boolean;
};

export default async function getCreateSubscription(
  contract: ApiContract<ViewSubscriptionRequest>
) {
  try {
    const respone = apiGet<ViewSubscriptionResponse>(
      `${contract.baseUrl}/webhook/viewSubscription`,
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
