import React from 'react';
import { shallow } from 'enzyme';
import { Client } from './index';

describe('Client', () => {
  it('renders without crashing', () => {
    shallow(
      <Client />,
    );
  });
});
