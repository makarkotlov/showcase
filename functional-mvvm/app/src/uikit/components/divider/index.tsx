import React from 'react'
import { View, StyleSheet, Insets, ViewProps } from 'react-native'

import { Theme } from '../../theme'

export namespace Divider {
  export interface Props extends ViewProps {
    /**
     * Will use half the height (0.5px)
     */
    half?: boolean
    dark?: boolean
    insets?: Insets
  }
}

export const Divider = ({ style, insets, dark, half, ...props }: Divider.Props) => {
  const containerStyle = [
    half ? styles.dividerHalfHeight : styles.dividerFullHeight,
    dark ? styles.darkDivider : styles.lightDivider,
    {
      marginTop: insets?.top,
      marginLeft: insets?.left,
      marginRight: insets?.right,
      marginBottom: insets?.bottom,
    },
    style,
  ]

  return <View style={containerStyle} pointerEvents="none" {...props} />
}

const styles = StyleSheet.create({
  dividerFullHeight: {
    height: 1,
  },
  dividerHalfHeight: {
    height: 0.5,
  },
  lightDivider: {
    backgroundColor: Theme.Colors.border,
  },
  darkDivider: {
    backgroundColor: Theme.Colors.border,
  },
})
