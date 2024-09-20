import { ServiceType } from "@/app/helpers/schemas";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IServices {
  services: ServiceType[];
}

const initialState: IServices = {
  services: []
}

export const servicesStore = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addNewService: (state, action: PayloadAction<ServiceType>) => {
      state.services.push(action.payload)
    },
    setServices: (state, action: PayloadAction<any>) => {
      state.services = action.payload
    }
  }
})

export const { addNewService, setServices } = servicesStore.actions;