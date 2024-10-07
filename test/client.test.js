import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

/**
 * Import components
 */
import App from "../app/src/App"
jest.mock('../app/src/views/login-page');
jest.mock('../app/src/views/homepage');

describe('Test React Routes', () => {
    test('Should redirect to login page', async () => {
        const history = createMemoryHistory();
        history.push('/404');
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        expect(history.location.pathname).toBe('/login');
    });

    test('Should render home page', async () => {
        App.setIsAuthenticated(true);
        const history = createMemoryHistory();
        history.push('/homepage');
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        expect(history.location.pathname).toBe('/homepage');
    });
});