// import react-testing methods
import React, { act } from "react";
import "@testing-library/jest-dom"
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

// import client components
import App from '../src/App';
import { UserModel } from "../src/userModel";
import LoginPage from '../src/views/login-page';
import HomePage from '../src/views/homepage';
import ProfilePage from "../src/views/profile";

const model = new UserModel();

test('Login page has login button', async () => {
  const testFunction = jest.fn(() => false);

  await waitFor(() => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage
          onGithubLogin={testFunction}
          message='' 
        />
      </MemoryRouter>
    );
  });
  const buttonElement = screen.getAllByRole('button', {name: 'Login with GitHub'})[0];
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
  act(() => {fireEvent.click(buttonElement)});
  expect(testFunction).toHaveBeenCalledTimes(1);
});

test('Homepage has join game button', async () => {
  const testFunction = jest.fn(() => false);

  await waitFor(() => {
    render(
      <MemoryRouter initialEntries={['/homepage']}>
        <HomePage 
          model={model}
          isJoinInputVisible={false}
          onJoinClick={testFunction}
          joinCode={''}
          onInputChange={testFunction}
          onSubmit={testFunction}
          />
      </MemoryRouter>
    );
  });
  const buttonElement = screen.getAllByRole('button', {name: 'Join Game'})[0];
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
  act(() => {fireEvent.click(buttonElement)});
  expect(testFunction).toHaveBeenCalledTimes(1);
});

test('Profile has log out button', async () => {
  const testFunction = jest.fn(() => false);

  await waitFor(() => {
    render(
      <MemoryRouter initialEntries={['/homepage']}>
        <ProfilePage
          handleLogout={testFunction}
          />
      </MemoryRouter>
    );
  });
  const buttonElement = screen.getAllByRole('button', {name: 'Log out'})[0];
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
  act(() => {fireEvent.click(buttonElement)});
  expect(testFunction).toHaveBeenCalledTimes(1);
});

test('Redirect to /login when rendered', async () => {
  await waitFor(() => {render(<App model={model}/>);});
  expect(window.location.pathname).toBe('/login');
});

afterAll((done) => {
  done();
});