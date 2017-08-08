import { createReducer, createConstants } from 'utils/';

const initialState = 'testingVal';

const constants = createConstants('UPPER', 'CHANGE_TYPE', 'NONE');
const reducer = createReducer(initialState, {
  [constants.NONE]: state => state,
  [constants.UPPER]: state => state.toUpperCase(),
  [constants.CHANGE_TYPE]: (state, { newValue }) => newValue,
  [constants.MULTIPLY]: (state, { modifier }) => state.map(_s => _s * modifier)
});

test('[utils/createReducer]', () => {
  expect.assertions(2);
  const test1 = reducer(initialState, { type: constants.NONE });
  expect(test1).toBe(initialState);

  const test2 = reducer(initialState, { type: constants.UPPER });
  expect(test2).toBe(initialState.toUpperCase());

  test('[utils/createReducer] New state', () => {
    expect.assertions(2);
    const newState = reducer(initialState, {
      type: constants.CHANGE_TYPE,
      newValue: [1, 2, 3, 4, 5]
    });

    expect(newState).toEqual([1, 2, 3, 4, 5]);
    expect(
      reducer(newState, {
        type: constants.MULTIPLY,
        modifier: 2
      })
    ).toEqual([2, 4, 6, 8, 10]);
  });
});
