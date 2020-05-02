import React from 'react';
import { render } from '@testing-library/react';
import PersistentDrawerLeft from './PersistentDrawerLeft';

test('renders company name', () => {
  const { getByText } = render(<PersistentDrawerLeft />);
  const companyName = getByText(/Pontual Import/i);
  expect(companyName).toBeInTheDocument();
});
