import React from 'react'

import { Container, Card, Label } from '@demoapp/uikit'

export namespace VehicleCard {
  export interface Props {
    brand: string
    model: string
    testID: string
    version: string
    onPressPayload: number
    onPress: (id: number) => void
  }
}

export const VehicleCard = ({ brand, model, version, onPress, onPressPayload, testID }: VehicleCard.Props) => {
  const handleOnPress = () => {
    onPress(onPressPayload)
  }

  return (
    <Card onPress={handleOnPress} testID={testID}>
      <Card.Content>
        <Container row>
          <Label variant="titleLarge" title="Brand: " />
          <Label variant="bodyMedium" title={brand} />
        </Container>
        <Container row>
          <Label variant="titleLarge" title="Model: " />
          <Label variant="bodyMedium" title={model} />
        </Container>
        <Container row>
          <Label variant="titleLarge" title="Version: " />
          <Label variant="bodyMedium" title={version} />
        </Container>
      </Card.Content>
    </Card>
  )
}
