import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Vehicle } from '../../../api'
import { useVehiclesContext } from '../../../index'

export const useVehiclesListViewModel = () => {
  const store = useVehiclesContext()

  const {
    isError,
    isLoading,
    data: vehicles,
  } = useQuery({
    queryKey: ['vehiclesList'],
    queryFn: store.apiService.getVehicles,
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
    filterVehiclesByModel,
  }
}
