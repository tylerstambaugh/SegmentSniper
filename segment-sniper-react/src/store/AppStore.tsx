import NeuronGSM from "@neurongsm/react";
import { Token, initialTokenState } from "./types/token";
import { User, initialUserState } from "./types/user";
import { ApiConfig, initialApiConfigState } from "./types/apiConfig";

interface State {
  tokenData: Token;
  user: User;
  apiConfig: ApiConfig;
}

export const { State, useNeuron } = NeuronGSM.Store<State>();

export default function AppStore() {
  return (
    <>
      <State<Token> name={"tokenData"} state={initialTokenState} persist />
      <State<User> name={"user"} state={initialUserState} persist />
      <State<ApiConfig> name={"apiConfig"} state={initialApiConfigState} />
    </>
  );
}
