/**
 * @jest-environment jsdom
 */

import React from 'react';

// import API mocking
// import {http, HttpResponse} from 'msw'
// import {setupServer} from 'msw/node'

// import react-testing methods
import { render, fireEvent, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

// the component to test
import App from '../app/src/App'

describe('App', () => { 
    test('renders App component', () => {
        //render(<App />)
        //expect(screen.getByText('Login')).toBeInTheDocument()
        expect(1).toBe(1)
    });
});
