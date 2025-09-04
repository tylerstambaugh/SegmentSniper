import { AppUserModel } from '../../../models/User';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiPost } from '../BaseApiService';

export type AddUserRequest = {
  authUserId: string;
};

export type AddUserResponse = {
  user: AppUserModel;
};

export default async function postUser(
  contract: ApiContract<AddUserRequest>
): Promise<AddUserResponse> {
  try {
    const response = await apiPost<AddUserRequest, AddUserResponse>(
      `${contract.baseUrl}/admin/add-user`,
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
