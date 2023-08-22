import React from 'react'
import { Alert } from 'react-native'
import { jest } from '@jest/globals'
import { RenderAPI, act, fireEvent, render } from '@testing-library/react-native'

import { VehicleDetailsScreen } from './index'
import { vehiclesData } from '../../../__mocks__'
import { useVehicleDetailsViewModel } from './model'

jest.mock('./model')

type VehicleListViewModelProps = ReturnType<typeof useVehicleDetailsViewModel>

const defaultProps: VehicleListViewModelProps = {
  isError: false,
  isLoading: false,
  vehicle: undefined,
}

const mockVehiclesListViewModel = (props: VehicleListViewModelProps) => {
  ;(useVehicleDetailsViewModel as jest.Mock<typeof useVehicleDetailsViewModel>).mockClear().mockReturnValue(props)
}

describe('<VehicleDetailsScreen />', () => {
  let rendered: RenderAPI

  const onPressHelpLinkMock = jest.fn()

  const onPressHelpLink: VehicleDetailsScreen.Props['onPressHelpLink'] = ({ uri, onLinkError }) => {
    onPressHelpLinkMock()

    onLinkError('')
  }

  const renderScreen = async () => {
    rendered = render(<VehicleDetailsScreen onPressHelpLink={onPressHelpLink} />)

    await act(async () => {
      await Promise.resolve()
    })
  }

  describe('UI', () => {
    it('should render the error message if there are no vehicle data in the backend response', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel(defaultProps)

      await renderScreen()

      /**
       * Assert
       */
      const emptyMessage = rendered.getByText('There was an error')

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

    it('should render the vehicle details with the following vehicle data: photo, brand, model, version, connector type, recommended charger and a link to the fastned help page', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, vehicle: vehiclesData[0] })

      await renderScreen()

      /**
       * Assert
       */
      const { model, brand, version, connectorType, recommendedCharger } = vehiclesData[0]

      const photo = rendered.getByRole('image')
      const modelLabel = rendered.getByText(model)
      const brandLabel = rendered.getByText(brand)
      const versionLabel = rendered.getByText(version)
      const connectorTypeLabel = rendered.getByText(connectorType)
      const recommendedChargerLabel = rendered.getByText(recommendedCharger)
      const helpButton = rendered.getByRole('button', { name: 'Find out more' })

      expect(photo).toBeVisible()
      expect(modelLabel).toBeVisible()
      expect(brandLabel).toBeVisible()
      expect(helpButton).toBeVisible()
      expect(versionLabel).toBeVisible()
      expect(connectorTypeLabel).toBeVisible()
      expect(recommendedChargerLabel).toBeVisible()
    })
  })

  describe('Functionality', () => {
    it('should trigger the onPressHelpLink callback upon pressing on the help button', async () => {
      /**
       * Arrange
       */
      mockVehiclesListViewModel({ ...defaultProps, vehicle: vehiclesData[0] })

      await renderScreen()

      /**
       * Assume
       */
      expect(onPressHelpLinkMock).toHaveBeenCalledTimes(0)

      /**
       * Act
       */
      const helpButton = rendered.getByRole('button', { name: 'Find out more' })

      await act(async () => {
        fireEvent.press(helpButton)

        await Promise.resolve()
      })

      /**
       * Assert
       */
      expect(onPressHelpLinkMock).toHaveBeenCalledTimes(1)
    })

    it('should show the Alert if the onPressHelpLink promise was rejected', async () => {
      /**
       * Arrange
       */
      jest.spyOn(Alert, 'alert')

      mockVehiclesListViewModel({ ...defaultProps, vehicle: vehiclesData[0] })

      await renderScreen()

      /**
       * Assume
       */
      expect(onPressHelpLinkMock).toHaveBeenCalledTimes(0)

      /**
       * Act
       */
      const helpButton = rendered.getByRole('button', { name: 'Find out more' })

      await act(async () => {
        fireEvent.press(helpButton)

        await Promise.resolve()
      })

      /**
       * Assert
       */
      expect(onPressHelpLinkMock).toHaveBeenCalledTimes(1)

      expect(Alert.alert).toHaveBeenCalledWith('An error occured', '')
    })
  })
})
