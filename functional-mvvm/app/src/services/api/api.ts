import axios from 'axios'
import { Platform } from 'react-native'
import Config from 'react-native-config'

import type { Vehicle } from './models'

const baseUrl = Platform.select({
  ios: Config.BASE_URL_IOS,
  android: Config.BASE_URL_ANDROID,
})

export const ApiService = {
  getVehicles: async (): Promise<Vehicle[]> => {
    if (!baseUrl) {
      throw new Error('Error in the Api.getVehicles —> baseUrl is undefined')
    }

    const { data } = await axios.get<Vehicle[]>(`${baseUrl}vehicles/`)

    return data
  },

  getVehicleById: async (id: number): Promise<Vehicle> => {
    if (!baseUrl) {
      throw new Error('Error in the Api.getVehicles —> baseUrl is undefined')
    }

    const { data } = await axios.get<Vehicle>(`${baseUrl}vehicles/${id}/`)

    return data
  },
}
