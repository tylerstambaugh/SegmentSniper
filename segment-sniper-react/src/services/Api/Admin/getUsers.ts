import { AppUserModel } from '../../../models/AppUserModel';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../BaseApiService';

export type UsersListResponse = {
  users: AppUserModel[];
};

export default async function getUsers(contract: ApiContract) {
  try {
    const response = await apiGet<UsersListResponse>(
      `${contract.baseUrl}/admin/getUsers`,
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
