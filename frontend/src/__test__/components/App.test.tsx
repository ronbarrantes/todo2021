import React from 'react'
import { render } from '@testing-library/react'
import App from '../../components/App'

// TODO: TEST NOT WORKING

describe('App.tsx', () => {
    it('Should display the title Hello', () => {
        render(<App />)
        // const div = screen.getByTestId('app')
        // // console.log('DIV ===>>>', div)

        // expect(div).toBeInTheDocument()
    })
})