var debug = require('debug')('test:app');
// import react-testing methods
import React from 'react';
import "@testing-library/jest-dom"
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// import client components
import App from '../src/App';
import LoginPage from '../src/views/login-page';

test('App renders login page and finds login button', () => {
  render(<App/>);
  const buttonElement = screen.getAllByRole('button', {name: 'Login'})[0];
  debug('Found: ' + buttonElement + buttonElement.innerHTML);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
});

test('Login fires off onLogin', () => {
  const onLogin = jest.fn(() => false);
  render(<MemoryRouter initialEntries={['/login']}>
      <LoginPage onLogin={onLogin} />
    </MemoryRouter>
  );
  const buttonElement = screen.getAllByRole('button', {name: 'Login'})[0];
  fireEvent.click(buttonElement);
  expect(onLogin).toHaveBeenCalledTimes(1);
});


test('Redirect to /login when rendered', () => {
  render(<App/>);
  debug('Current path: ' + window.location.pathname);
  expect(window.location.pathname).toBe('/login');
});

afterAll((done) => {
  done();
});