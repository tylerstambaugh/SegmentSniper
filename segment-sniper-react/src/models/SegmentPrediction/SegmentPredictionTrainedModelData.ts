import { DateTime } from "luxon";


export interface SegmentPredictionTrainedModelData {
    numberOfSegmentsUsedInModelTraining: number,
    createdDate: DateTime,
    updatedDate: DateTime
}