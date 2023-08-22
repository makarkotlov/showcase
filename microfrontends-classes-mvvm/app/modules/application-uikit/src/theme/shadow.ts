import { Platform } from 'react-native'

import { Constants } from './constants'

const s = Platform.select({
  ios: {
    shadowOpacity: 0.07,
    shadowRadius: 3 * Constants.layoutBase,
    shadowOffset: {
      width: 0,
      height: 3 * Constants.layoutBase,
    },
  },

  android: {
    elevation: 2,
  },
})

const m = Platform.select({
  ios: {
    shadowOpacity: 0.07,
    shadowRadius: 4 * Constants.layoutBase,
    shadowOffset: {
      width: 0,
      height: Constants.layoutBase,
    },
  },

  android: {
    elevation: 4,
  },
})

export const Shadow = { s, m }

export type Shadow = typeof Shadow
