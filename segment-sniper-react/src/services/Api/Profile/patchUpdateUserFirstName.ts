import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPatch } from "../BaseApiService";
import { ProfileResponse } from "./getProfile";

export type UpdateUserFirstNameRequest = {
  firstName: string;
};

export default async function patchUpdateUserFistName(
  contract: ApiContract<UpdateUserFirstNameRequest>
) {
  try {
    const response = await apiPatch<
      UpdateUserFirstNameRequest,
      ProfileResponse
    >(`${contract.baseUrl}/Profile/UpdateUserFirstName`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
