export default class UnsuccessfulHttpResponseError extends Error {
  response: Response;

  private constructor(response: Response, message: string) {
    super(message);
    this.response = response;
  }

  static async fromResponse(
    response: Response
  ): Promise<UnsuccessfulHttpResponseError> {
    let message = 'An unexpected error occurred.';
    try {
      const contentType = response.headers.get('content-type')!;
      if (contentType.startsWith('text/plain;')) {
        message = await response.text();
      }
    } catch (e) {
      // Optionally handle error
    }
    return new UnsuccessfulHttpResponseError(response, message);
  }
}
