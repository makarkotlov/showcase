import React from 'react'
import { Text, TextProps } from 'react-native-paper'

export namespace Label {
  export interface Props extends Omit<TextProps<unknown>, 'children'> {
    title: string
  }
}

export const Label = ({ title, ...props }: Label.Props) => {
  return <Text {...props}>{title}</Text>
}
