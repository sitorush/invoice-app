import React from 'react';
import { shallow } from 'enzyme';
import { FormClient } from './index';

describe('FormClient', () => {
  it('renders without crashing', () => {
    shallow(
      <FormClient handleSubmit={() => {}}/>,
    );
  });
});
