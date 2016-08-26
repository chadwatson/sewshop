import { fromJS } from 'immutable';
import { colorSchemes } from 'containers/App/constants';
import {
  CHANGE_SCHEME,
  CHANGE_STYLE,
  RESET_TEXT,
  UPDATE_TEXT,
  INFO_SHOWN,
  INITIAL_TEXT,
  MIN_TEXT,
  STYLE_FLOWERS,
} from './constants';

const extraFlags = 2;
const pricePerFlag = 5;
const currentScheme = 0;
const initialState = fromJS({
  text: INITIAL_TEXT,
  style: STYLE_FLOWERS,
  colors: colorSchemes[currentScheme],
  total: pricePerFlag * (INITIAL_TEXT.length + extraFlags),
  isValid: false,
  infoShown: false,
  pricePerFlag,
  currentScheme,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case CHANGE_SCHEME:
      return state
        .set('colors', fromJS(colorSchemes[action.id]))
        .set('currentScheme', action.id);

    case CHANGE_STYLE:
      return state.set('style', action.style);

    case RESET_TEXT:
      return state
        .set('text', INITIAL_TEXT)
        .set('total', getTotal(state, INITIAL_TEXT))
        .set('isValid', false);

    case UPDATE_TEXT:
      return state
        .set('text', action.text)
        .set('total', getTotal(state, action.text))
        .set('isValid', action.text.length >= MIN_TEXT);

    case INFO_SHOWN:
      return state.set('infoShown', true);

    default:
      return state;
  }
}

function getTotal(state, text) {
  return state.get('pricePerFlag') * text.length + extraFlags;
}
