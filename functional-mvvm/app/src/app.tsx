import React, { useRef } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import type { NavigationContainerRef } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RootNavigator } from './navigation'
import { VehiclesContextProvider } from './contexts'
import type { RootNavigatorParamsList } from './navigation/paramslist'

type RootNavigator = NavigationContainerRef<RootNavigatorParamsList>

export const Application = () => {
  const queryClientRef = useRef(new QueryClient()).current

  return (
    <QueryClientProvider client={queryClientRef}>
      <SafeAreaProvider>
        <VehiclesContextProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <RootNavigator />
        </VehiclesContextProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
