var debug = require('debug')('test:app');
// import react-testing methods
import React from "react";
import "@testing-library/jest-dom"
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

// import client components
import App from '../src/App';
import { UserModel } from "../src/userModel";
import LoginPage from '../src/views/login-page';

const model = new UserModel();

test('Login page has login button', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <LoginPage />
    </MemoryRouter>
  );
  const buttonElement = screen.getAllByRole('button', {name: 'Login with GitHub'})[0];
  debug('Found: ' + buttonElement + buttonElement.innerHTML);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
});

test('Redirect to /login when rendered', () => {
  render(<App model={model}/>);
  debug('Current path: ' + window.location.pathname);
  expect(window.location.pathname).toBe('/login');
});

afterAll((done) => {
  done();
});