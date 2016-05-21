import test from 'tape';
import { createReducer, createConstants } from 'utils/';

const initialState = 'testingVal';

const constants = createConstants('UPPER', 'CHANGE_TYPE', 'NONE');
const reducer = createReducer(initialState, {
  [constants.NONE]: state => state,
  [constants.UPPER]: state => state.toUpperCase(),
  [constants.CHANGE_TYPE]: (state, { newValue }) => newValue,
  [constants.MULTIPLY]: (state, { modifier }) => state.map(_s => _s * modifier)
});

test('[utils/createReducer]', t => {
  t.plan(2);
  const test1 = reducer(initialState, { type: constants.NONE });
  t.equal(test1, initialState, 'testing `constants.NONE`');

  const test2 = reducer(initialState, { type: constants.UPPER });
  t.equal(test2, initialState.toUpperCase(), 'testing `constants.UPPER`');

  test('[utils/createReducer] New state', t => {
    t.plan(2);
    const newState = reducer(initialState, {
      type: constants.CHANGE_TYPE,
      newValue: [ 1, 2, 3, 4, 5 ]
    });

    t.deepEqual(newState, [ 1, 2, 3, 4, 5 ], 'testing `constants.CHANGE_TYPE`');
    t.deepEqual(reducer(newState, {
      type: constants.MULTIPLY,
      modifier: 2
    }), [ 2, 4, 6, 8, 10 ], 'testing `constants.MULTIPLY`');
  });
});
