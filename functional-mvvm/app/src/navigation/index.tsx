import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack'

import { Routes } from './stacks/vehicles/routes'
import type { RootNavigatorParamsList } from './paramslist'
import { VehiclesListScreen, VehicleDetailsScreen } from '../screens'

const { Navigator, Screen } = createStackNavigator<RootNavigatorParamsList>()

const commonScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: 'white',
  },
}

export const RootNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={commonScreenOptions}>
      <Screen name={Routes.VehiclesList} component={VehiclesListScreen} />
      <Screen name={Routes.VehicleDetails} component={VehicleDetailsScreen} />
    </Navigator>
  </NavigationContainer>
)
