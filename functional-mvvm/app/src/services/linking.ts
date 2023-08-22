import { Linking } from 'react-native'

export const LinkingService = {
  async handleLinkRequest(uri: string) {
    const canOpen = await Linking.canOpenURL(uri)

    if (!canOpen) {
      return Promise.reject(new Error(`Error in LinkingModule.handleLinkRequest —> unable to open URI ${uri}`))
    }

    await Linking.openURL(uri)
  },
}
