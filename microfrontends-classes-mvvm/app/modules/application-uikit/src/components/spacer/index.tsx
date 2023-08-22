import React from 'react'
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native'

import { Theme } from '../../theme'

export namespace Spacer {
  export interface Props extends ViewProps {
    /**
     * @default — "m"
     */
    size?: Size
  }

  export type Size = 'flex' | Theme['Spacing']
}

export const Spacer = ({ size = 'm', style, ...props }: Spacer.Props) => (
  <View {...props} style={[styles[size], style]} />
)

const spacingKeys = Object.keys(Theme.Spacing) as Theme['Spacing'][]

const mappedSizes = {} as { [K in Spacer.Size]: ViewStyle }

for (const spacingKey of spacingKeys) {
  mappedSizes[spacingKey] = {
    width: Theme.Spacing[spacingKey],
    height: Theme.Spacing[spacingKey],
  }
}

mappedSizes.flex = {
  flex: 1,
}

const styles = StyleSheet.create(mappedSizes)
