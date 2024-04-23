import { ProfileData } from "../../../models/Profile/ProfileData";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";

export type ProfileResponse = {
  profileData: ProfileData;
};

export default async function getProfile(contract: ApiContract) {
  try {
    const response = apiGet<ProfileResponse>(
      `${contract.baseUrl}/Profile`,
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
