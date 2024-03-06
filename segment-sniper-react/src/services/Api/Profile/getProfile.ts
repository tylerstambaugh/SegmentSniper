import { ProfileData } from "../../../models/Profile/ProfileData";
import { TokenData } from "../../../stores/useTokenStore";
import { User } from "../../../stores/useUserStore";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";

export type ProfileResponse = {
  profileData: ProfileData;
};

export default async function getProfile(contract: ApiContract) {
  try {
    const response = apiGet<ProfileResponse>(
      `${contract.baseUrl}/profile`,
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
