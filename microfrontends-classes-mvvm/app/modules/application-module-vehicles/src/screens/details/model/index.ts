import { useQuery } from '@tanstack/react-query'

import { useVehiclesContext } from '../../..'

export const useVehicleDetailsViewModel = () => {
  const store = useVehiclesContext()

  const {
    isError,
    isLoading,
    data: vehicle,
  } = useQuery({
    queryKey: [`vehicleDetails${store.selectedVehicleId}`],
    queryFn: () => {
      if (!store.selectedVehicleId) {
        throw new Error('Error in useVehicleDetailsViewModel.queryFn —> selectedVehicleId is undefined')
      }

      return store.apiService.getVehicleById(store.selectedVehicleId)
    },
  })

  return {
    isError,
    vehicle,
    isLoading,
  }
}
