import React, { PropsWithChildren } from 'react'
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, jest, beforeEach, expect, beforeAll } from '@jest/globals'

import type { Api } from '../../../api'
import { VehiclesStore } from '../../../store'
import { useVehiclesListViewModel } from './index'
import { useVehiclesContext } from '../../../index'
import { vehiclesData } from '../../../../__mocks__'
import { apiServiceMockSuccess, apiServiceMockWithError, getVehiclesMockFn } from '../../../api/mock'

jest.mock('../../../index')

const mockVehiclesContext = (apiService: Api.Service) => {
  ;(useVehiclesContext as jest.Mock<typeof useVehiclesContext>)
    .mockClear()
    .mockReturnValue(new VehiclesStore(apiService))
}

describe('useVehiclesListViewModel', () => {
  const queryClient = new QueryClient()

  const wrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    mockVehiclesContext(apiServiceMockSuccess)
  })

  it('should trigger getVehicles query upon rendering', () => {
    /**
     * Assume
     */
    expect(getVehiclesMockFn).toHaveBeenCalledTimes(0)

    /**
     * Act
     */
    renderHook(() => useVehiclesListViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(getVehiclesMockFn).toHaveBeenCalledTimes(1)
  })

  it('should return isLoading flag if the getVehicles query is pending', async () => {
    /**
     * Act
     */
    const { result } = renderHook(() => useVehiclesListViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('should return isError flag if there is an error returned by the getVehicles query', async () => {
    /**
     * Arrange
     */
    mockVehiclesContext(apiServiceMockWithError)

    /**
     * Act
     */
    const { result } = renderHook(() => useVehiclesListViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(result.current.isError).toBe(false)

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 10000 })
  }, 15000)

  it('should return the vehicles list upon the getVehicles query is successfully resolved', async () => {
    /**
     * Act
     */
    const { result } = renderHook(() => useVehiclesListViewModel(), { wrapper })

    /**
     * Assert
     */
    await waitFor(() => expect(result.current.vehicles).toBe(vehiclesData))
  })

  it('should return the filterVehiclesByModel callback', () => {
    /**
     * Act
     */
    const { result } = renderHook(() => useVehiclesListViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(typeof result.current.filterVehiclesByModel).toBe('function')
  })

  it('should return undefined as the filteredVehicles list if the filterVehiclesByModel callback was not triggered', () => {
    /**
     * Act
     */
    const { result } = renderHook(() => useVehiclesListViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(result.current.filteredVehicles).toBe(undefined)
  })

  it('should return the filteredVehicles list if the filterVehiclesByModel was triggered', async () => {
    /**
     * Arrange
     */
    const { result } = renderHook(() => useVehiclesListViewModel(), { wrapper })

    await waitFor(() => expect(result.current.vehicles).toBe(vehiclesData))

    /**
     * Act
     */
    act(() => {
      result.current.filterVehiclesByModel(vehiclesData[0].model[0])
    })

    /**
     * Assert
     */
    expect(result.current.filteredVehicles).toStrictEqual(
      vehiclesData.filter(({ model }) => model.includes(vehiclesData[0].model[0]))
    )
  })
})
