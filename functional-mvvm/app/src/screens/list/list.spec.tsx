import React from 'react'
import { jest } from '@jest/globals'
import { RenderAPI, act, fireEvent, render, within } from '@testing-library/react-native'

import { VehiclesListScreen } from './index'
import { vehiclesData } from '../../../__mocks__'
import { useVehiclesListViewModel } from './model'
import { Routes } from '../../navigation/stacks/vehicles/routes'
import { mockNavigation } from '../../../__mocks__/mockNavigation'

jest.mock('./model')

type VehicleListViewModelProps = ReturnType<typeof useVehiclesListViewModel>

const defaultProps: VehicleListViewModelProps = {
  vehicles: [],
  isError: false,
  isLoading: false,
  filteredVehicles: undefined,
  setSelectedVehicleId: jest.fn(),
  filterVehiclesByModel: jest.fn(),
}

const mockVehiclesListViewModel = (props: VehicleListViewModelProps) => {
  ;(useVehiclesListViewModel as jest.Mock<typeof useVehiclesListViewModel>).mockClear().mockReturnValue(props)
}

describe('<VehiclesListScreen />', () => {
  let rendered: RenderAPI

  const navigation = mockNavigation<VehiclesListScreen.NavigationProps['navigation']>()

  const route: VehiclesListScreen.NavigationProps['route'] = {
    key: 'test-vehicles-list',
    name: Routes.VehiclesList,
  }

  const renderScreen = async () => {
    rendered = render(<VehiclesListScreen navigation={navigation} route={route} />)

    await act(async () => {
      await Promise.resolve()
    })
  }

  describe('UI', () => {
    it('should render the empty component if there are no vehicles in the backend response', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel(defaultProps)

      await renderScreen()

      /**
       * Assert
       */
      const emptyMessage = rendered.getByText('The list is empty')

      expect(emptyMessage).toBeVisible()
    })

    it('should render the spinner component if the model is loading', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, isLoading: true })

      await renderScreen()

      /**
       * Assert
       */
      const spinner = rendered.getByTestId('spinner')

      expect(spinner).toBeVisible()
    })

    it('should render the error message if there is an error in the model', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, isError: true })

      await renderScreen()

      /**
       * Assert
       */
      const errorMessage = rendered.getByText('There was an error')

      expect(errorMessage).toBeVisible()
    })

    it('should render the list of vehicle cards with brand, model and version labels', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, vehicles: vehiclesData })

      await renderScreen()

      /**
       * Assert
       */
      const vehicleCards = rendered.getAllByTestId('vehiclecard')

      expect(vehicleCards.length).toBe(vehiclesData.length)

      vehicleCards.forEach((card, i) => {
        const { model, brand, version } = vehiclesData[i]

        const modelLabel = within(card).getByText(model)
        const brandLabel = within(card).getByText(brand)
        const versionLabel = within(card).getByText(version)

        expect(modelLabel).toBeVisible()
        expect(brandLabel).toBeVisible()
        expect(versionLabel).toBeVisible()
      })
    })

    it('should render the search bar', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, vehicles: vehiclesData })

      await renderScreen()

      /**
       * Assert
       */
      const searchbar = rendered.getByRole('search')

      expect(searchbar).toBeVisible()
    })
  })

  describe('Functionality', () => {
    it('should trigger the navigation.navigate upon pressing on a VehicleCard', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, vehicles: vehiclesData })

      await renderScreen()

      /**
       * Assume
       */
      expect(navigation.navigate).toHaveBeenCalledTimes(0)

      /**
       * Act
       */
      const firstVehicleCard = rendered.getAllByTestId('vehiclecard')[0]

      await act(async () => {
        fireEvent.press(firstVehicleCard)

        await Promise.resolve()
      })

      /**
       * Assert
       */
      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith(Routes.VehicleDetails)
    })

    it('should trigger the filterVehiclesByModel callback upon submitting the searchbar field', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, vehicles: vehiclesData })

      await renderScreen()

      /**
       * Assume
       */
      expect(defaultProps.filterVehiclesByModel).toHaveBeenCalledTimes(0)

      /**
       * Act
       */
      const searchbar = rendered.getByRole('search')

      const firstMockedVehicleData = vehiclesData[0]
      const firstLetterOfTheModel = firstMockedVehicleData.model[0]

      await act(async () => {
        fireEvent(searchbar, 'changeText', firstLetterOfTheModel)
        fireEvent(searchbar, 'onSubmitEditing')

        await Promise.resolve()
      })

      /**
       * Assert
       */
      expect(defaultProps.filterVehiclesByModel).toHaveBeenCalledTimes(1)
      expect(defaultProps.filterVehiclesByModel).toHaveBeenCalledWith(firstLetterOfTheModel)
    })
  })
})
