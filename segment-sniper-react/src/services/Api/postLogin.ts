import { Token } from "../../store/types/token";
import { User } from "../../store/types/user";
import { ApiContract } from "./ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "./ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "./BaseApiService";

export type LoginRequest = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  tokenData: Token;
  userData: User;
};

export default async function postLogin(contract: ApiContract<LoginRequest>) {
  try {
    const response = apiPost<LoginRequest, LoginResponse>(
      `${contract.baseUrl}/auth/login`,
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
