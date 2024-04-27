import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type UpdatePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
};

export default async function postUpdatePassword(contract: ApiContract) {
  try {
    const response = apiPost<UpdatePasswordRequest, UpdatePasswordResponse>(
      `${contract.baseUrl}/Profile/UpdatePassword`,
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
