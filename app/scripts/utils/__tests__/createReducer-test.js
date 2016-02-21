/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import createReducer from '../createReducer';
import createConstants from '../createConstants';

const initialState = 'testingVal';

const constants = createConstants('UPPER', 'CHANGE_TYPE', 'NONE');
const reducer = createReducer(initialState, {
  [constants.NONE]: state => state,
  [constants.UPPER]: state => state.toUpperCase(),
  [constants.CHANGE_TYPE]: (state, { newValue }) => newValue,
  [constants.MULTIPLY]: (state, { modifier }) => state.map(_s => _s * modifier)
});

describe('Utility `createReducer`', () => {
  it('testing `constants.NONE`', () => {
    expect(reducer(initialState, {
      type: constants.NONE
    })).to.eql(initialState);
  });

  it('testing `constants.UPPER`', () => {
    expect(reducer(initialState, {
      type: constants.UPPER
    })).to.eql(initialState.toUpperCase());
  });

  describe('Work with new state', () => {
    const newState = reducer(initialState, {
      type: constants.CHANGE_TYPE,
      newValue: [ 1, 2, 3, 4, 5 ]
    });

    it('testing `constants.CHANGE_TYPE`', () => {
      expect(newState).to.eql([ 1, 2, 3, 4, 5 ]);
    });

    it('testing `constants.MULTIPLY`', () => {
      expect(reducer(newState, {
        type: constants.MULTIPLY,
        modifier: 2
      })).to.eql([ 2, 4, 6, 8, 10 ]);
    });
  });
});
