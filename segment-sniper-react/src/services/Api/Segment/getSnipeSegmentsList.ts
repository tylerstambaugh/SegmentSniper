import { SnipeSegmentListItem } from '../../../models/Segment/SnipeSegmentListItem';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../BaseApiService';

export type SnipeSegmentsRequest = {
  activityId?: string | null;
};

export type SnipeSegmentsResponse = {
  snipedSegments: SnipeSegmentListItem[];
};

export default async function postSnipeSegmentsList(
  contract: ApiContract<SnipeSegmentsRequest>
) {
  try {
    const response = apiGet<SnipeSegmentsResponse>(
      `${contract.baseUrl}/sniper/snipeSegments/${contract.request?.activityId}`,
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
