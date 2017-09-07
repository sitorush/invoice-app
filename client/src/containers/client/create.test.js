import React from 'react';
import { shallow } from 'enzyme';
import { ClientCreate } from './create';

describe('ClientCreate', () => {
  it('renders without crashing', () => {
    const noop = () => {}
    const props = {
      insertClient: noop,
      pushState: noop
    }
    shallow(
      <ClientCreate {...props} />,
    );
  });
});