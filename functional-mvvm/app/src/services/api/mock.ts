import { ApiService } from './api'
import { vehiclesData } from '../../../__mocks__'

export const getVehiclesMockFn = jest.fn()

const tick = async () =>
  await new Promise(res => {
    setTimeout(res, 100)
  })

const getVehicles = async () => {
  getVehiclesMockFn()

  await tick()

  return vehiclesData
}

const getVehiclesWithError = () => {
  getVehiclesMockFn()

  return Promise.reject()
}

export const getVehicleByIdMockFn = jest.fn()

const getVehicleById = async () => {
  getVehicleByIdMockFn()

  await tick()

  return vehiclesData[0]
}

const getVehicleByIdWithError = () => {
  getVehicleByIdMockFn()

  return Promise.reject()
}

export const apiServiceMockSuccess: typeof ApiService = {
  getVehicles,
  getVehicleById,
}

export const apiServiceMockWithError: typeof ApiService = {
  getVehicles: getVehiclesWithError,
  getVehicleById: getVehicleByIdWithError,
}
