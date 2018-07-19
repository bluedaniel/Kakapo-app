import { createConstants, createReducer, isFSA, createActions } from 'utils/';

test('createConstants - returns key value pairs representing each item in the given string literal', () => {
  expect(createConstants(`FOO BAR BAZ_BOB`)).toEqual({
    FOO: 'FOO',
    BAR: 'BAR',
    BAZ_BOB: 'BAZ_BOB',
  });
  expect(
    createConstants(`
    FOO
    BAR
    BAZ_BOB
  `)
  ).toEqual({
    FOO: 'FOO',
    BAR: 'BAR',
    BAZ_BOB: 'BAZ_BOB',
  });
});

test('createConstants - throws error if types string is not provided', () => {
  expect(() => createConstants()).toThrow();
  expect(() => createConstants('')).toThrow();
  expect(() => createConstants(``)).toThrow();
  expect(() => createConstants(true)).toThrow();
  expect(() => createConstants({ foo: 'bar' })).toThrow();
});

test('createConstants - can add an optional prefix to returned value strings', () => {
  expect(createConstants(`FOO BAR BAZ_BOB`, { prefix: 'TEST' })).toEqual({
    FOO: 'TEST_FOO',
    BAR: 'TEST_BAR',
    BAZ_BOB: 'TEST_BAZ_BOB',
  });
  expect(
    createConstants(
      `
    FOO
    BAR
    BAZ_BOB
  `,
      { prefix: 'TEST' }
    )
  ).toEqual({
    FOO: 'TEST_FOO',
    BAR: 'TEST_BAR',
    BAZ_BOB: 'TEST_BAZ_BOB',
  });
});

test('createReducer - returns a function that, when called, returns the given initial state object by default', () => {
  const initialState = { baz: false, bob: false };
  const reducer = createReducer(initialState, {});
  expect(typeof reducer).toBe('function');
  expect(reducer(undefined, 'NON_EXISTANT_ACTION')).toEqual(initialState);
});

test('createReducer - returns a function that, when called, returns a new state object determined by the given action.type function', () => {
  const initialState = { baz: false, bob: false };
  const fooFn = jest.fn();
  const barFn = jest.fn();

  fooFn.mockReturnValue({ baz: true, bob: false });
  barFn.mockReturnValue({ baz: true, bob: true });

  const reducer = createReducer(initialState, {
    FOO: fooFn,
    BAR: barFn,
  });

  // nothing has been called yet
  expect(fooFn.mock.calls.length).toBe(0);
  expect(barFn.mock.calls.length).toBe(0);

  // fire FOO action
  expect(reducer(undefined, { type: 'FOO' })).toEqual({
    baz: true,
    bob: false,
  });

  // fooFn should have been called once now
  expect(fooFn.mock.calls.length).toBe(1);
  expect(fooFn.mock.calls[0][0]).toEqual(initialState);
  expect(fooFn.mock.calls[0][1]).toEqual({ type: 'FOO' });
  expect(barFn.mock.calls.length).toBe(0);

  // fire BAR action
  expect(reducer({ baz: true, bob: false }, { type: 'BAR' })).toEqual({
    baz: true,
    bob: true,
  });

  // barFn should have also been called once now
  expect(fooFn.mock.calls.length).toBe(1);
  expect(barFn.mock.calls.length).toBe(1);
  expect(barFn.mock.calls[0][0]).toEqual({ baz: true, bob: false });
  expect(barFn.mock.calls[0][1]).toEqual({ type: 'BAR' });
});

test('isFSA - util to test if action is FSA compliant', () => {
  const fooFn = () => ({ type: 'FOO' });
  const barFn = test => ({ type: 'BAR', payload: test });
  const bazFn = test => ({ payload: test });

  expect(isFSA(fooFn)).toEqual(true);
  expect(isFSA(barFn)).toEqual(true);
  expect(isFSA(bazFn)).toEqual(false);
});

test('createActions - throws an error if not passed correct object', () => {
  expect(() => createActions(null)).toThrow();
  expect(() => createActions()).toThrow();
  expect(() => createActions({})).toThrow();
});

test('createActions - empty value produces a type-only action creator', () => {
  const test1 = createActions({ testAction: null });
  const test2 = createActions({ testAction: [] });
  const test3 = createActions({ testAction: {} });

  expect(test1.testAction()).toEqual({ type: 'TEST_ACTION' });
  expect(test2.testAction()).toEqual({ type: 'TEST_ACTION' });
  expect(test3.testAction()).toEqual({ type: 'TEST_ACTION' });
});

test('createActions - produces a type for each action', () => {
  const actions = createActions({ testAction: ['test'] });
  expect(actions.TEST_ACTION).toEqual('TEST_ACTION');
  expect(actions.NO_TEST).toEqual(undefined);
});

test("createActions - ['test'] produces a valid action creator", () => {
  const actions = createActions({ testAction: ['test'] });
  expect(actions.testAction('hi')).toEqual({
    type: 'TEST_ACTION',
    payload: { test: 'hi' },
  });
});

test("createActions - ['test', 'meta'] produces a valid action creator", () => {
  const actions = createActions({ testAction: ['test', 'meta'] });
  expect(actions.testAction('hi', 'someMeta')).toEqual({
    type: 'TEST_ACTION',
    payload: { test: 'hi' },
    meta: 'someMeta',
  });
});

test("createActions - ['error'] produces a valid error action creator", () => {
  const actions = createActions({ testAction: ['error'] });
  expect(actions.testAction('somethingWrong')).toEqual({
    type: 'TEST_ACTION',
    payload: 'somethingWrong',
    error: true,
  });
});

test('createActions - {foo: 1, bar: 2} produces a valid action creator with payload', () => {
  const actions = createActions({
    testAction: { foo: 1, bar: 2 },
  });
  expect(actions.testAction({ foo: 10, foobar: 3 })).toEqual({
    type: 'TEST_ACTION',
    payload: {
      foo: 10,
      bar: 2,
    },
  });
});

test('createActions - custom action creators', () => {
  const actions = createActions({ custom: () => 123 });
  expect(actions.custom()).toEqual({ type: 'CUSTOM', payload: 123 });
});

test('createActions - action types prefix', () => {
  const actions = createActions({ testAction: null }, { prefix: 'FOO_' });
  expect(actions.testAction().type).toEqual('FOO_TEST_ACTION');
  expect(actions.TEST_ACTION).toEqual(undefined);
  expect(actions.FOO_TEST_ACTION).toEqual('FOO_TEST_ACTION');
});
