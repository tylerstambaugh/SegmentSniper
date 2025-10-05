// modalStore.ts
import { create } from "zustand";
import { EquipmentModalState } from "../components/Molecules/Garage/BikeDetails/Equipment/EquipmentList";


export const useEquipmentModalStateStore = create<{
  modalState: EquipmentModalState;
  setModalState: (state: EquipmentModalState) => void;
}>((set) => ({
  modalState: { type: "none" },
  setModalState: (state) => set({ modalState: state }),
}));
