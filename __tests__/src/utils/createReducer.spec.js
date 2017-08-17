import { createActions } from 'reduxsauce';
import { createReducer } from 'utils/';

const initialState = 'testingVal';

const { Types, Creators } = createActions({
  upper: null,
  changeType: ['newValue'],
  none: null,
  multiply: ['modifier']
});

const reducer = createReducer(initialState, {
  [Types.NONE]: state => state,
  [Types.UPPER]: state => state.toUpperCase(),
  [Types.CHANGE_TYPE]: (state, { newValue }) => newValue,
  [Types.MULTIPLY]: (state, { modifier }) => state.map(_s => _s * modifier)
});

test('[utils/createReducer]', () => {
  expect.assertions(2);
  const test1 = reducer(initialState, Creators.none());
  expect(test1).toBe(initialState);

  const test2 = reducer(initialState, Creators.upper());
  expect(test2).toBe(initialState.toUpperCase());

  test('[utils/createReducer] New state', () => {
    expect.assertions(2);
    const newState = reducer(
      initialState,
      Creators.changeType([1, 2, 3, 4, 5])
    );

    expect(newState).toEqual([1, 2, 3, 4, 5]);
    expect(reducer(newState, Creators.multiply(2)).toEqual([2, 4, 6, 8, 10]));
  });
});
