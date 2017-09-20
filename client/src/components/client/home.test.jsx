import React from 'react';
import { shallow } from 'enzyme';
import { ClientHome } from './home';

describe('Client', () => {
  it('renders without crashing', () => {
    shallow(
      <ClientHome />,
    );
  });
});

  