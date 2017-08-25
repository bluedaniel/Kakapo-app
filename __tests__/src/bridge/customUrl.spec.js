import bridge from 'bridge/web/customUrl';

const { getCustomFile, getCustomURL } = bridge;

test('[bridge/customUrl/getCustomFile]', () => {
  expect(getCustomFile()).toMatchSnapshot();
  expect(getCustomFile(5)).toMatchSnapshot();
});

test('[bridge/customUrl/getCustomURL success]', () => {
  const data = { source: 'file', name: 'Testing' };
  expect(getCustomURL(data)).toMatchSnapshot();
});

test('[bridge/customUrl/getCustomURL failure]', () => {
  const data = { source: 'other', file: 'wind.mp9', name: 'Testing' };
  const err =
    'File is mp9, but must be one of mp3, opus, ogg, wav, aac, m4a, mp4, weba';
  expect(() => getCustomURL(data)).toThrow(err);
});
