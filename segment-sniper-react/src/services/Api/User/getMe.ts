import { AppUserModel } from '../../../models/AppUserModel';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../BaseApiService';

export default async function getMe(contract: ApiContract) {
  try {
    const response = await apiGet<{ appUserModel: AppUserModel }>(
      `${contract.baseUrl}/User/me`,
      contract
    );

    return response.appUserModel; // ✅ unwrap before returning
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
