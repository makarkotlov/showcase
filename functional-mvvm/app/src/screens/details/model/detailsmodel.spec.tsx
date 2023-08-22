/* eslint-disable no-import-assign */
import { jest } from '@jest/globals'
import React, { PropsWithChildren } from 'react'
import { renderHook, waitFor } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ApiService } from '../../../services'
import { vehiclesData } from '../../../../__mocks__'
import { useVehicleDetailsViewModel } from './index'
import { useVehiclesContext } from '../../../contexts'
import { apiServiceMockSuccess, apiServiceMockWithError, getVehicleByIdMockFn } from '../../../services/api/mock'

jest.mock('../../../services')
jest.mock('../../../contexts')

const mockVehiclesContext = () => {
  ;(useVehiclesContext as jest.Mock<typeof useVehiclesContext>).mockClear().mockReturnValue({
    getSelectedVehicleId: () => 1234,
    setSelectedVehicleId: jest.fn(),
  })
}

const mockApiService = (mock: typeof ApiService) => {
  // @ts-expect-error — all good, because it is a mock
  ApiService = mock
}

describe('useVehicleDetailsViewModel', () => {
  const queryClient = new QueryClient()

  const wrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    mockVehiclesContext()
    mockApiService(apiServiceMockSuccess)
  })

  it('should trigger the getVehicleById query upon rendering', () => {
    /**
     * Assume
     */
    expect(getVehicleByIdMockFn).toHaveBeenCalledTimes(0)

    /**
     * Act
     */
    renderHook(() => useVehicleDetailsViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(getVehicleByIdMockFn).toHaveBeenCalledTimes(1)
  })

  it('should return isLoading flag if the getVehicleById query is pending', async () => {
    /**
     * Act
     */
    const { result } = renderHook(() => useVehicleDetailsViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('should return isError flag if there is an error returned by the getVehicleById query', async () => {
    /**
     * Arrange
     */
    mockApiService(apiServiceMockWithError)

    /**
     * Act
     */
    const { result } = renderHook(() => useVehicleDetailsViewModel(), { wrapper })

    /**
     * Assert
     */
    expect(result.current.isError).toBe(false)

    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 10000 })
  }, 15000)

  it('should return the vehicle details data upon the getVehicleById query is successfully resolved', async () => {
    /**
     * Act
     */
    const { result } = renderHook(() => useVehicleDetailsViewModel(), { wrapper })

    /**
     * Assert
     */
    await waitFor(() => expect(result.current.vehicle).toBe(vehiclesData[0]))
  })
})
