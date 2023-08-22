import React, { PropsWithChildren, createContext, useContext, useMemo, useRef } from 'react'

type VehiclesContext = {
  setSelectedVehicleId: (id: number) => void
  getSelectedVehicleId: () => number | undefined
}

const VehiclesContext = createContext<VehiclesContext>({
  setSelectedVehicleId: () => {},
  getSelectedVehicleId: () => undefined,
})

export const VehiclesContextProvider = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const selectedVehicleIdRef = useRef<number>()

  const setSelectedVehicleId = (id: number) => {
    selectedVehicleIdRef.current = id
  }

  const getSelectedVehicleId = () => {
    return selectedVehicleIdRef.current
  }

  const value = useMemo(
    () => ({
      setSelectedVehicleId,
      getSelectedVehicleId,
    }),
    []
  )

  return <VehiclesContext.Provider value={value}>{children}</VehiclesContext.Provider>
}

export const useVehiclesContext = () => {
  const context = useContext(VehiclesContext)

  if (!context) {
    throw 'VehiclesContext should be used inside the VehiclesContextProvider'
  }

  return context
}
