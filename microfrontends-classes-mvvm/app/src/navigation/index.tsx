import React, { ComponentType } from 'react'
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'

import type { GlobalRoutes } from './routes'
import type { RootNavigatorParamsList } from './paramslist'

const { Navigator, Screen } = createStackNavigator<RootNavigatorParamsList>()

export namespace Navigator {
  export interface Props {
    routes: {
      name: GlobalRoutes
      Screen: ComponentType
    }[]
    initNavigationRef: (ref: NavigationContainerRef<RootNavigatorParamsList>) => void
  }
}

const commonScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: 'white',
  },
}

export const RootNavigator = ({ routes, initNavigationRef }: Navigator.Props) => (
  <NavigationContainer ref={initNavigationRef}>
    <Navigator screenOptions={commonScreenOptions}>
      {routes.map(({ name, Screen: ScreenComponent }) => (
        <Screen key={name} name={name} component={ScreenComponent} />
      ))}
    </Navigator>
  </NavigationContainer>
)
