import axios, { AxiosInstance } from 'axios'

import type { Vehicle } from './models'

export namespace Api {
  export interface Service {
    getVehicles: () => Promise<Vehicle[]>
    getVehicleById: (id: number) => Promise<Vehicle>
  }
}

export class Api implements Api.Service {
  private _client: AxiosInstance

  private _baseUrl: string

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl

    this._client = axios.create()
  }

  getVehicles = async (): Promise<Vehicle[]> => {
    if (!this._baseUrl) {
      throw new Error('Error in the Api.getVehicles —> baseUrl is undefined')
    }

    const { data } = await this._client.get<Vehicle[]>(`${this._baseUrl}vehicles/`)

    return data
  }

  getVehicleById = async (id: number): Promise<Vehicle> => {
    if (!this._baseUrl) {
      throw new Error('Error in the Api.getVehicles —> baseUrl is undefined')
    }

    const { data } = await this._client.get<Vehicle>(`${this._baseUrl}vehicles/${id}/`)

    return data
  }

  get baseUrl() {
    return this._baseUrl
  }
}
