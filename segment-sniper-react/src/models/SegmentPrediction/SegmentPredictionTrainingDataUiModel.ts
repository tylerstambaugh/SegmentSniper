import { DateTime } from "luxon";


export interface SegmentPredictionTrainingDataUiModel {
    id: string,
    numberOfSegmentsUsedInModelTraining: number,
    createdDate: DateTime,
    updatedDate: DateTime,
    hasTrainedSegmentPredictionModel?: boolean
}