import { TokenData } from '../../../stores/useTokenStore';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiPost } from '../BaseApiService';

type RefreshTokenRequest = {
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenResponse = {
  refreshedToken: TokenData;
};

export default async function postRefreshToken(
  contract: ApiContract<RefreshTokenRequest>
) {
  //TODO remove all of this after testing
  // const headers = new Headers();
  // headers.append('Content-Type', 'application/json');

  // let urlencoded = new URLSearchParams();
  // urlencoded.append("grant_type", "refresh_token");
  // urlencoded.append("refresh_token", contract.request!.refreshToken ?? "");

  // const requestOptions: RequestInit = {
  //   method: 'POST',
  //   headers: headers,
  //   body: JSON.stringify(contract.request),
  //   redirect: 'follow',
  //   signal: contract.abortController!.signal,
  // };

  // const tokenResponseJson: any = await (
  //   await window.fetch(`${contract.baseUrl}/auth/refresh-token`, requestOptions)
  // ).json();

  try {
    const response = apiPost<RefreshTokenRequest, RefreshTokenResponse>(
      `${contract.baseUrl}/auth/refresh-token`,
      contract
    );
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }

  // const response: TokenData = {
  //   accessToken: tokenResponseJson['refreshedToken']['accessToken'],
  //   expiration: tokenResponseJson['refreshedToken']['expiration'],
  //   refreshToken: tokenResponseJson['refreshedToken']['refreshToken'],
  // };

  //return response;
}
