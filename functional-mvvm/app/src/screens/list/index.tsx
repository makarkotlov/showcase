import React from 'react'
import type { RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { FlatList, FlatListProps, StyleSheet } from 'react-native'

import { VehicleCard } from './components'
import type { Vehicle } from '../../services'
import { useVehiclesListViewModel } from './model'
import { Routes } from '../../navigation/stacks/vehicles/routes'
import type { RootNavigatorParamsList } from '../../navigation/paramslist'
import { Container, Label, Spacer, Theme, Searchbar, Divider, Spinner } from '../../uikit'

export namespace VehiclesListScreen {
  export interface NavigationProps {
    route: RouteProp<RootNavigatorParamsList, Routes.VehiclesList>
    navigation: StackNavigationProp<RootNavigatorParamsList, Routes.VehiclesList>
  }

  export type VehiclesFlatList = FlatListProps<Vehicle>
}

const keyExtractor: VehiclesListScreen.VehiclesFlatList['keyExtractor'] = ({ id }) => id.toString()

export const VehiclesListScreen = ({ navigation }: VehiclesListScreen.NavigationProps) => {
  const { setSelectedVehicleId, vehicles, isError, isLoading, filterVehiclesByModel, filteredVehicles } =
    useVehiclesListViewModel()

  if (isError) {
    return (
      <Container style={styles.screenCommonPadding}>
        <Label title="There was an error" />
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container style={styles.screenCommonPadding}>
        <Spinner testID="spinner" />
      </Container>
    )
  }

  const onPressVehicleCard = (id: number) => {
    setSelectedVehicleId(id)

    navigation.navigate(Routes.VehicleDetails)
  }

  const renderVehicleCard: VehiclesListScreen.VehiclesFlatList['renderItem'] = ({ item }) => (
    <VehicleCard
      brand={item.brand}
      model={item.model}
      testID="vehiclecard"
      version={item.version}
      onPressPayload={item.id}
      onPress={onPressVehicleCard}
    />
  )

  const renderEmptyComponent = () => (
    <Container style={styles.screenCommonPadding}>
      <Label title="The list is empty" />
    </Container>
  )

  return (
    <>
      <Spacer size="l" />
      <Container style={styles.searchbarContainer}>
        {/* @ts-expect-error — FIXME: we don't need to manually control the value here but the Searchbar declaration requires it although working fine without it */}
        <Searchbar placeholder="Search" onChangeText={filterVehiclesByModel} />
      </Container>
      <Spacer size="l" />
      <Divider half />
      <FlatList
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Spacer}
        renderItem={renderVehicleCard}
        data={filteredVehicles || vehicles}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.vehiclesList}
      />
    </>
  )
}

const styles = StyleSheet.create({
  vehiclesList: {
    padding: Theme.Spacing.l,
    backgroundColor: 'white',
  },
  searchbarContainer: {
    paddingHorizontal: Theme.Spacing.l,
  },
  screenCommonPadding: {
    padding: Theme.Spacing.l,
  },
})
