import React from 'react'
import { StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { Container, Label, Theme, Button, Spacer, Spinner } from '@demoapp/uikit'

import { useVehicleDetailsViewModel } from './model'

export namespace VehicleDetailsScreen {
  export interface Props {
    onPressHelpLink: (params: { uri: string; onLinkError: (error: string) => void }) => void
  }
}

export const VehicleDetailsScreen = ({ onPressHelpLink }: VehicleDetailsScreen.Props) => {
  const { vehicle, isError, isLoading } = useVehicleDetailsViewModel()

  if (isError) {
    return (
      <Container style={styles.screenPadding}>
        <Label title="There was an error" />
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container style={styles.screenPadding}>
        <Spinner testID="spinner" />
      </Container>
    )
  }

  if (!vehicle) {
    return (
      <Container style={styles.screenPadding}>
        <Label title="There was an error" />
      </Container>
    )
  }

  const handlePressHelpLinkError = (error: string) => {
    Alert.alert('An error occured', error)
  }

  const handlePressHelpLink = () => {
    onPressHelpLink({
      uri: vehicle.helpUrl,
      onLinkError: handlePressHelpLinkError,
    })
  }

  return (
    <ScrollView contentContainerStyle={[styles.screenPadding, styles.scrollView]}>
      <Container flex style={styles.photoContainer}>
        <Image
          accessible
          style={styles.flex}
          resizeMode="contain"
          accessibilityRole="image"
          source={{ uri: vehicle.imageUrl }}
        />
      </Container>
      <Container flex>
        <Container row>
          <Label variant="titleLarge" title="Brand: " />
          <Label variant="bodyMedium" title={vehicle.brand} />
        </Container>
        <Container row>
          <Label variant="titleLarge" title="Model: " />
          <Label variant="bodyMedium" title={vehicle.model} />
        </Container>
        <Container row>
          <Label variant="titleLarge" title="Version: " />
          <Label variant="bodyMedium" title={vehicle.version} />
        </Container>
        <Container row>
          <Label variant="titleLarge" title="Connector Type: " />
          <Label variant="bodyMedium" title={vehicle.connectorType} />
        </Container>
        <Container row>
          <Label variant="titleLarge" title="Recommended Charger: " />
          <Label variant="bodyMedium" title={vehicle.recommendedCharger} />
        </Container>
        <Spacer size="m" />
        <Spacer size="flex" />
        <Button mode="outlined" onPress={handlePressHelpLink}>
          <Label variant="titleLarge" title="Find out more" />
        </Button>
        <Spacer size="m" />
      </Container>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screenPadding: {
    padding: Theme.Spacing.l,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  photoContainer: {
    minHeight: 300,
  },
})
