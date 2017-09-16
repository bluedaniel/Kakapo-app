import routes from 'routes/';

test('[routes]', () => {
  expect(routes).toMatchSnapshot();
});
