import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiDeleteNoRequest } from '../BaseApiService';

export type DeleteAccountResponse = {
  success: boolean;
};

export default async function deleteAccount(contract: ApiContract) {
  try {
    const response = apiDeleteNoRequest<DeleteAccountResponse>(
      `${contract.baseUrl}/Profile/DeleteAccount`,
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
