import { Linking } from 'react-native'

export namespace LinkingModule {
  export interface Service {
    handleLinkRequest: (uri: string) => Promise<void>
  }
}

export class LinkingModule {
  async handleLinkRequest(uri: string) {
    const canOpen = await Linking.canOpenURL(uri)

    if (!canOpen) {
      return Promise.reject(new Error(`Error in LinkingModule.handleLinkRequest —> unable to open URI ${uri}`))
    }

    await Linking.openURL(uri)
  }
}
