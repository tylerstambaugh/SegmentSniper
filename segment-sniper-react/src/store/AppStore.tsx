import NeuronGSM from "@neurongsm/react";
import { Token, initialTokenState } from "./types/token";
import { User, initialUserState } from "./types/user";

export const { State, useNeuron } = NeuronGSM.Store();

export default function AppStore() {
  return (
    <>
      <State name={"tokenData"} state={initialTokenState} />
      <State name={"user"} state={initialUserState} />
    </>
  );
}
