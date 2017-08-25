import bridge from 'bridge/web/settings';

const { getItem, setItem } = bridge;

test('[bridge/settings/getItem]', () => {
  expect(getItem('lang')).toBe('en');
  expect(getItem('mute')).toBe(null);
  expect(getItem('updateStatus')).toBe(undefined);
});

test('[bridge/settings/setItem lang]', () => {
  setItem('lang', 'de');
  expect(getItem('lang')).toBe('de');
});

test('[bridge/settings/setItem] updateStatus', () => {
  setItem('updateStatus', 'testing');
  expect(getItem('updateStatus')).toBe(undefined);
});
