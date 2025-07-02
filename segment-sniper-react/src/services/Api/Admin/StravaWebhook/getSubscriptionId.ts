import { ApiContract } from '../../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../../BaseApiService';

export type GetSubscriptionIdRequest = Record<string, never>;
export type SubscriptionIdResponse = {
  subscriptionId: number;
};

export default async function getSubscriptionId(
  contract: ApiContract<GetSubscriptionIdRequest>
) {
  try {
    const respone = apiGet<SubscriptionIdResponse>(
      `${contract.baseUrl}/webhook/getExistingSubscriptionId`,
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
