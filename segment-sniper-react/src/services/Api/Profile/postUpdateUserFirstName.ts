import { ProfileData } from "../../../models/Profile/ProfileData";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";
import { ProfileResponse } from "./getProfile";

export type UpdateUserFirstNameRequest = {
  firstName: string;
};

export default async function postUpdateUserFistName(contract: ApiContract) {
  try {
    const response = apiPost<UpdateUserFirstNameRequest, ProfileResponse>(
      `${contract.baseUrl}/Profile/UpdateUserFirstName`,
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
