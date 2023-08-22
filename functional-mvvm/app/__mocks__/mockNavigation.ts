import type { StackNavigationProp } from '@react-navigation/stack'

import { Routes } from '../src/navigation/stacks/vehicles/routes'
import type { RootNavigatorParamsList } from '../src/navigation/paramslist'

export const mockNavigation = <T>(customMock?: T) =>
  ({
    pop: jest.fn(),
    push: jest.fn(),
    reset: jest.fn(),
    getId: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    getState: jest.fn(),
    navigate: jest.fn(),
    dispatch: jest.fn(),
    popToTop: jest.fn(),
    getParent: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    isFocused: () => true,
    canGoBack: () => false,
    removeListener: jest.fn(),
    addListener: () => () => {},
    ...customMock,
  }) as StackNavigationProp<RootNavigatorParamsList, Routes.VehiclesList> as T
