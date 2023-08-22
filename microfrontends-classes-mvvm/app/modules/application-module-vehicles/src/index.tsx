import React, { createContext, useContext, ComponentType } from 'react'

import { Api } from './api'
import { Routes } from './navigation'
import { VehiclesStore } from './store'
import { VehicleDetailsScreen, VehiclesListScreen } from './screens'

const VehiclesContext = createContext<VehiclesStore | undefined>(undefined)

export * from './navigation'

export const useVehiclesContext = () => {
  const context = useContext(VehiclesContext)

  if (!context) {
    throw new Error(
      'Error in useVehiclesContext —> useVehiclesContext must be used within the VehiclesContextProvider'
    )
  }

  return context
}

export class VehiclesModule {
  private _store: VehiclesStore
  private _routes: {
    name: Routes
    Screen: ComponentType
  }[]

  constructor({
    baseUrl,
    linking,
    navigation,
  }: {
    baseUrl: string
    linking: {
      handleLinkRequest: (uri: string) => Promise<void>
    }
    navigation: {
      navigate: (route: Routes) => void
    }
  }) {
    const api = new Api(baseUrl)

    this._store = new VehiclesStore(api)

    const onPressVehicleCard = (id: number) => {
      this._store.setSelectedVehicleId(id)

      navigation.navigate(Routes.VehicleDetails)
    }

    const onPressHelpLink = async ({
      uri,
      onLinkError,
    }: {
      uri: string
      onLinkError: (errorL: string) => void
    }) => {
      try {
        await linking.handleLinkRequest(uri)
      } catch (exception) {
        onLinkError(JSON.stringify(exception))
      }
    }

    this._routes = [
      {
        name: Routes.VehiclesList,
        Screen: () => (
          <VehiclesContext.Provider value={this._store}>
            <VehiclesListScreen onPressVehicleCard={onPressVehicleCard} />
          </VehiclesContext.Provider>
        ),
      },
      {
        name: Routes.VehicleDetails,
        Screen: () => (
          <VehiclesContext.Provider value={this._store}>
            <VehicleDetailsScreen onPressHelpLink={onPressHelpLink} />
          </VehiclesContext.Provider>
        ),
      },
    ]
  }

  get store() {
    return this._store
  }

  get routes() {
    return this._routes
  }
}
