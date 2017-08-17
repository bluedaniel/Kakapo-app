import React from 'react';
import { shallow } from 'enzyme';
import Progress from 'components/ui/progress/progress';

function setup(props = {}) {
  return { props, wrapper: shallow(<Progress {...props} />) };
}

test('<Progress/> render', () => {
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('progress');
});

test('<Progress/> rounds 0.415 to 42% ', () => {
  const { wrapper } = setup({ progress: 0.415 });
  expect(wrapper.find('.progress-text').text()).toBe('42%');
});
