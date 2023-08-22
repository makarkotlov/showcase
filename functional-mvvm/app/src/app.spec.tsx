import React from 'react'
import { RenderAPI, act, render, waitFor } from '@testing-library/react-native'

import { Application } from './app'
import { Routes } from './navigation/stacks/vehicles/routes'

describe('<Application />', () => {
  let rendered: RenderAPI

  it('should be initialised without errors', async () => {
    rendered = render(<Application />)

    await act(async () => {
      await Promise.resolve()
    })

    await act(async () => {
      await waitFor(() => expect(rendered.getByText(Routes.VehiclesList)).toBeVisible())
    })
  })
})
