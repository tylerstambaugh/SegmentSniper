//TODO : DELETE THIS FILE IF UNUSED

// import { SegmentDetails } from "../../../models/Segment/SegmentDetails";
// import { ApiContract } from "../ApiCommon/ApiContract";
// import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
// import { apiGet } from "../BaseApiService";

// export type SegmentDetailsRequest = {
//   segmentId: string;
// };

// export type SegmentDetailsResponse = {
//   detailedSegmentUIModel: SegmentDetails;
// };

// export default async function getSegmentDetails(
//   contract: ApiContract<SegmentDetailsRequest>
// ) {
//   try {
//     const response = apiGet<SegmentDetailsResponse>(
//       `${contract.baseUrl}/sniper/detailedSegment/${contract.request?.segmentId}`,
//       contract
//     );
//     return response;
//   } catch (error) {
//     if (error instanceof UnsuccessfulHttpResponseError) {
//       throw error;
//     }
//     throw error;
//   }
// }

//worked on sql server edition upgrades
