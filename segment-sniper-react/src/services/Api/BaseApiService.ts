import { BaseApiContract, BaseApiRequestContract } from "./ApiCommon/ApiContract";
import { toCamel } from "./ApiCommon/Helpers";
import UnsuccessfulHttpResponseError from "./ApiCommon/UnsuccessfulHttpResponseError";


export async function apiGet<TResponse>(
  url: string,
  contract: BaseApiContract,
): Promise<TResponse> {
  const response = await window.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${contract.token}`,
    },
    signal: contract.abortController?.signal,
  });

  if (!response.ok) {
    throw await UnsuccessfulHttpResponseError.fromResponse(response);
  }

  return toCamel(await response.json()) as TResponse;
}

export async function apiPost<TRequest, TResponse>(
  url: string,
  contract: BaseApiRequestContract<TRequest>,
): Promise<TResponse> {
  const response = await window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${contract.token}`,
    },
    body: JSON.stringify(contract.request),
    signal: contract.abortController?.signal,
  });

  if (!response.ok) {
    throw await UnsuccessfulHttpResponseError.fromResponse(response);
  }

  return toCamel(await response.json()) as TResponse;
}

export async function apiPostFormData<TRequest extends FormData, TResponse>(
  url: string,
  contract: BaseApiRequestContract<TRequest>,
): Promise<TResponse> {
  const response = await window.fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${contract.token}` },
    body: contract.request,
    signal: contract.abortController?.signal,
  });

  if (!response.ok) {
    throw await UnsuccessfulHttpResponseError.fromResponse(response);
  }

  return toCamel(await response.json()) as TResponse;
}
