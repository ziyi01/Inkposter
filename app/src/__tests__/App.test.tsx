import React from 'react';
// import react-testing methods
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

// import API mocking
// import {http, HttpResponse} from 'msw'
// import {setupServer} from 'msw/node'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
});

