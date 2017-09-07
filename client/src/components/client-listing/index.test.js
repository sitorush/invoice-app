import React from 'react';
import { shallow } from 'enzyme';
import { ClientListing } from './index';

describe('ClientListing', () => {
  it('renders without crashing', () => {
    shallow(
      <ClientListing />,
    );
  });
});