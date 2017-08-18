import React from 'react';
import renderer from 'react-test-renderer';
import Progress from 'components/ui/progress/progress';

test('<Progress/> render', () => {
  const tree = renderer.create(<Progress />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<Progress/> rounds 0.415 to 42% ', () => {
  const tree = renderer.create(<Progress {...{ progress: 0.415 }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
