import { ApiContract } from "./ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "./ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "./BaseApiService";

export type ClientConfigurationRequest = {};

export type ClientConfigurationResponse = {
  stravaApiClientId: string;
  googleMapsApiKey: string;
};

export default async function getClientConfiguration(
  contract: ApiContract<ClientConfigurationRequest>
) {
  try {
    const response = apiGet<ClientConfigurationResponse>(
      `${contract.baseUrl}/clientConfiguration`,
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
