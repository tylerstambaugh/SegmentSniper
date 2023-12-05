import { TokenData } from "../../../stores/useTokenStore";
import { ApiContract } from "../ApiCommon/ApiContract";

type RefreshTokenRequest = {
  accessToken: string;
  refreshToken: string;
};

export default async function postRefreshToken(
  contract: ApiContract<RefreshTokenRequest>
) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  // let urlencoded = new URLSearchParams();
  // urlencoded.append("grant_type", "refresh_token");
  // urlencoded.append("refresh_token", contract.request!.refreshToken ?? "");

  let requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(contract.request),
    redirect: "follow",
    signal: contract.abortController!.signal,
  };

  const tokenResponseJson: any = await (
    await window.fetch(`${contract.baseUrl}/auth/refresh-token`, requestOptions)
  ).json();

  const response: TokenData = {
    accessToken: tokenResponseJson["refreshedToken"]["accessToken"],
    expiration: tokenResponseJson["refreshedToken"]["expiration"],
    refreshToken: tokenResponseJson["refreshedToken"]["refreshToken"],
  };

  return response;
}
