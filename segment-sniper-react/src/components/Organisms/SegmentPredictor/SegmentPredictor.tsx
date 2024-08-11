import { useState, useEffect } from "react";
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery";
import { useGetTrainSegmentPredictionModel } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel";
import { SegmentPredictionTrainingDataUiModel } from "../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel";
import { CustomToast } from "../../Molecules/Toast/CustomToast";
import SegmentPredictionModelData from "../../Molecules/SegmentPrediction/SegmentPredictionModelData";


function SegmentPredictor () {

    const {data, isLoading: getSegmentPredictionTrainedModelQueryloading, error: getSegmentPredictionTrainedModelQueryError  }= useGetSegmentPredictionTrainedModelQuery();
    const trainSegmentPredictionModel = useGetTrainSegmentPredictionModel();
    const [segmentPredictionTrainedModelData, setSegmentPredictionTrainedModelData] = useState<SegmentPredictionTrainingDataUiModel | null>(data || null);
    const typedError = getSegmentPredictionTrainedModelQueryError as Error | null; // Type assertion


   async function handleTrainSegmentPredictionModelClick() {
    const trainedModel = await trainSegmentPredictionModel.mutateAsync();
    setSegmentPredictionTrainedModelData(trainedModel);
    }

    useEffect(() => {
        // Update state when query data changes
        if (data) {
            setSegmentPredictionTrainedModelData(data);
        }
    }, [data]);
    
    useEffect(() => {
        if(getSegmentPredictionTrainedModelQueryError instanceof Error) {
            CustomToast({
                message: "Trained Model Query Error",
                error: `Error: ${getSegmentPredictionTrainedModelQueryError.message}`,
                type: "error"
            });
        }
    }, [getSegmentPredictionTrainedModelQueryError] )


return 
    <>
    <SegmentPredictionModelData
     trainSegmentPredictionModel={handleTrainSegmentPredictionModelClick} 
     isLoading={getSegmentPredictionTrainedModelQueryloading} 
     error={typedError}
     segmentPredictionTrainedModelData={segmentPredictionTrainedModelData}
     />
     <SegmentPredictorForm />
     </>


}

export default SegmentPredictor