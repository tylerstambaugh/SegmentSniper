import { AppUserModel } from '../../../models/User';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../BaseApiService';

export default async function getMe(contract: ApiContract) {
  try {
    const response = apiGet<AppUserModel>(
      `${contract.baseUrl}/User/me`,
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
