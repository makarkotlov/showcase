import failOnConsole from 'jest-fail-on-console'
import 'react-native-gesture-handler/jestSetup'
import '@testing-library/jest-native'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

failOnConsole()

global.beforeAll(() => {
  jest.useFakeTimers({ advanceTimers: true })
})

global.beforeEach(() => {
  jest.resetAllMocks()
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-native-config', () => ({
  BASE_URL_IOS: 'MOCK_URL',
  BASE_URL_ANDROID: 'MOCK_URL',
}))

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
