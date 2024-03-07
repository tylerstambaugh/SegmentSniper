import { createStore } from "@sandstack/neuron/react";
import { ProfileData } from "../models/Profile/ProfileData";
import { Persist, PersistProps } from "@sandstack/neuron/persist";

interface State {
  profileData: ProfileData;
}

export const { State, useNeuron, Module } = createStore<State, PersistProps>();

export function NeuronStore() {
  return (
    <>
      <Module use={Persist} />
      <State name={"profileData"} state={{}} persist />
    </>
  );
}
