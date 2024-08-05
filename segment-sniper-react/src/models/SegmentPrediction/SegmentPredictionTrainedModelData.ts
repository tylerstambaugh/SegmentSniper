import { DateTime } from "luxon";


export interface SegmentPredictionTrainedModelData {
    id: string,
    numberOfSegmentsUsedInModelTraining: number,
    createdDate: DateTime,
    updatedDate: DateTime,
    hasTrainedSegmentPredictionModel?: boolean
}