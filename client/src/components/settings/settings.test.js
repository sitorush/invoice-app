import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from './index';

describe('Settings', () => {
  it('renders without crashing', () => {
    const noop = () => {}
    const props = {
      initialize: noop,
      getSettings: noop,
      saveSettings: noop,
    }
    shallow(
      <Settings {...props} />,
    );
  });
});
