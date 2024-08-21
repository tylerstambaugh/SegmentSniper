import { useState, useEffect } from "react";
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery";
import { useGetTrainSegmentPredictionModel } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel";
import { SegmentPredictionTrainingDataUiModel } from "../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel";
import { CustomToast } from "../../Molecules/Toast/CustomToast";
import SegmentPredictionModelData from "../../Molecules/SegmentPrediction/SegmentPredictionModelData";
import SegmentPredictorForm from "../../Molecules/SegmentPrediction/SegmentPredictorForm";
import SegmentDetailsCard from "../../Molecules/SegmentPrediction/SegmentDetailsCard";
import { SegmentDetails } from "../../../models/Segment/SegmentDetails";


function SegmentPredictor () {

    const {data, isLoading: getSegmentPredictionTrainedModelQueryloading, error: getSegmentPredictionTrainedModelQueryError  }= useGetSegmentPredictionTrainedModelQuery();
    const trainSegmentPredictionModel = useGetTrainSegmentPredictionModel();
    const [segmentPredictionTrainedModelData, setSegmentPredictionTrainedModelData] = useState<SegmentPredictionTrainingDataUiModel | null>(data || null);

    const [segmentDetails, setSegmentDetails] = useState<SegmentDetails>();
   async function handleTrainSegmentPredictionModelClick() {
    const trainedModel = await trainSegmentPredictionModel.mutateAsync();
    setSegmentPredictionTrainedModelData(trainedModel);
    }

    useEffect(() => {
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


return (
    <>
    <SegmentPredictionModelData
     trainSegmentPredictionModel={handleTrainSegmentPredictionModelClick} 
     isLoading={getSegmentPredictionTrainedModelQueryloading} 
     segmentPredictionTrainedModelData={segmentPredictionTrainedModelData}
     />
     <SegmentPredictorForm setSegmentDetails={setSegmentDetails}/>
     <SegmentDetailsCard segmentDetails={segmentDetails}/>
     </>
)

}

export default SegmentPredictor