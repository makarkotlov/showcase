import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export namespace Container {
  export interface Props extends ViewProps {
    row?: boolean
    flex?: boolean
  }
}

export const Container = ({ flex, row, style: styleOverride, ...props }: Container.Props) => {
  const style = (flex && styles.flex) || (row && styles.row)

  return <View style={[style, styleOverride]} {...props} />
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
