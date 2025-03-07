import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import { SegmentPredictionTrainedModelResponse } from '../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData';
import getTrainSegmentPredictionModel from '../../../services/Api/SegmentPrediction/getTrainSegmentPredictionModel';

export const useGetTrainSegmentPredictionModel = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  const abortController = new AbortController();

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken!,
      abortController: abortController,
    };

    const response: SegmentPredictionTrainedModelResponse =
      await getTrainSegmentPredictionModel(contract);

    if (!response.segmentPredictionTrainingDataUiModel)
      throw new Error('Failure to train model');
    // setProfile(response.profileData);
    //setProfileData(response.profileData);
    return response.segmentPredictionTrainingDataUiModel;
  }

  return { mutateAsync, data, isLoading, isError, error };
};
