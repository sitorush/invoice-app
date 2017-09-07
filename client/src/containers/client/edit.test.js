import React from 'react';
import { shallow } from 'enzyme';
import { ClientEdit } from './edit';

describe('ClientCreate', () => {
  it('renders without crashing', () => {
    const noop = () => {}
    const props = {
      initialize: noop,
      updateClient: noop,
      findClient: noop,
      pushState: noop
    }
    shallow(
      <ClientEdit {...props}/>,
    );
  });
});