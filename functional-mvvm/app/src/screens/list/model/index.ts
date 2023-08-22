import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useVehiclesContext } from '../../../contexts'
import { ApiService, Vehicle } from '../../../services'

export const useVehiclesListViewModel = () => {
  const { setSelectedVehicleId } = useVehiclesContext()

  const {
    isError,
    isLoading,
    data: vehicles,
  } = useQuery({
    queryKey: ['vehiclesList'],
    queryFn: ApiService.getVehicles,
  })

  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>()

  const filterVehiclesByModel = useCallback(
    (searchTerm: string) => {
      if (!vehicles) {
        return
      }

      if (!searchTerm) {
        setFilteredVehicles(undefined)
      }

      const result = vehicles.filter(vehicle => vehicle.model.includes(searchTerm))

      if (!result.length) {
        return
      }

      setFilteredVehicles(result)
    },
    [vehicles]
  )

  return {
    isError,
    vehicles,
    isLoading,
    filteredVehicles,
    setSelectedVehicleId,
    filterVehiclesByModel,
  }
}
