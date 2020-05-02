import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders greeting', () => {
  const { getByText } = render(<App />);
  const greeting = getByText(/Bem-vindo/i);
  expect(greeting).toBeInTheDocument();
});
