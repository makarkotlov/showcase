import { useQuery } from '@tanstack/react-query'

import { ApiService } from '../../../services'
import { useVehiclesContext } from '../../../contexts'

export const useVehicleDetailsViewModel = () => {
  const { getSelectedVehicleId } = useVehiclesContext()

  const selectedVehicleId = getSelectedVehicleId()

  const {
    isError,
    isLoading,
    data: vehicle,
  } = useQuery({
    queryKey: [`vehicleDetails${selectedVehicleId}`],
    queryFn: () => {
      if (!selectedVehicleId) {
        throw new Error('Error in useVehicleDetailsViewModel.queryFn —> selectedVehicleId is undefined')
      }

      return ApiService.getVehicleById(selectedVehicleId)
    },
  })

  return {
    isError,
    vehicle,
    isLoading,
  }
}
