import Config from 'react-native-config'
import { LinkingModule } from '@demoapp/linking'
import { VehiclesModule } from '@demoapp/vehicles'
import { Platform, StatusBar } from 'react-native'
import React, { ComponentType, PureComponent } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import type { NavigationContainerRef } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RootNavigator } from './navigation'
import type { GlobalRoutes } from './navigation/routes'
import type { RootNavigatorParamsList } from './navigation/paramslist'

type RootNavigator = NavigationContainerRef<RootNavigatorParamsList>

let NavigationRef: RootNavigator | null = null

export class Application extends PureComponent {
  private _navigation = {
    navigate: (route: GlobalRoutes) => {
      NavigationRef?.navigate(route)
    },
    goBack: () => {
      NavigationRef?.goBack()
    },
  }

  private readonly _queryClient: QueryClient
  private readonly _vehiclesModule: VehiclesModule
  private readonly _routes: { name: GlobalRoutes; Screen: ComponentType }[]

  constructor(props: NonNullable<unknown>) {
    super(props)

    this._queryClient = new QueryClient()

    const linkingModule = new LinkingModule()

    const baseUrl = Platform.select({
      ios: Config.BASE_URL_IOS,
      android: Config.BASE_URL_ANDROID,
    })

    if (!baseUrl) {
      throw new Error('Error in Application.constructor —> baseUrl is undefined')
    }

    this._vehiclesModule = new VehiclesModule({
      baseUrl,
      linking: linkingModule,
      navigation: this._navigation,
    })

    this._routes = this._vehiclesModule.routes
  }

  private initNavigationRef = (ref: RootNavigator) => {
    NavigationRef = ref
  }

  render() {
    return (
      <QueryClientProvider client={this._queryClient}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <RootNavigator routes={this._routes} initNavigationRef={this.initNavigationRef} />
        </SafeAreaProvider>
      </QueryClientProvider>
    )
  }
}
