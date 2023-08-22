import type { Api } from '../api'

export class VehiclesStore {
  private _apiService: Api.Service

  private _selectedVehicleId?: number

  constructor(api: Api.Service) {
    this._apiService = api
  }

  setSelectedVehicleId(id: number) {
    this._selectedVehicleId = id
  }

  get apiService() {
    return this._apiService
  }

  get selectedVehicleId() {
    return this._selectedVehicleId
  }
}
