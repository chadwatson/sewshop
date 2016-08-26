import { fromJS } from 'immutable';
import { TOGGLE_DRAWER } from './constants';

const initialState = fromJS({
  drawerActive: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return state.set('drawerActive', !state.get('drawerActive'));

    default:
      return state;
  }
}
