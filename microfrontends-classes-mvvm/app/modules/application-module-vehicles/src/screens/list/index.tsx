import React from 'react'
import { FlatList, FlatListProps, StyleSheet } from 'react-native'
import { Container, Label, Spacer, Theme, Searchbar, Divider, Spinner } from '@demoapp/uikit'

import { Vehicle } from '../../api'
import { VehicleCard } from './components'
import { useVehiclesListViewModel } from './model'

export namespace VehiclesListScreen {
  export interface Props {
    onPressVehicleCard: (id: number) => void
  }
}

type VehiclesFlatList = FlatListProps<Vehicle>

const keyExtractor: VehiclesFlatList['keyExtractor'] = ({ id }) => id.toString()

export const VehiclesListScreen = ({ onPressVehicleCard }: VehiclesListScreen.Props) => {
  const { vehicles, isError, isLoading, filterVehiclesByModel, filteredVehicles } = useVehiclesListViewModel()

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

  const renderVehicleCard: VehiclesFlatList['renderItem'] = ({ item }) => (
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
