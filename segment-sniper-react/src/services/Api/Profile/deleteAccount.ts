import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiDeleteNoRequest } from "../BaseApiService";

export type DeleteAccountRequest = {
  success: boolean;
};

export default async function deleteAccount(contract: ApiContract) {
  try {
    const response = apiDeleteNoRequest<DeleteAccountRequest>(
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
