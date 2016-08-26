import {
  CHANGE_SCHEME,
  CHANGE_STYLE,
  RESET_TEXT,
  UPDATE_TEXT,
  INFO_SHOWN,
} from './constants';

export function changeScheme(id) {
  return {
    type: CHANGE_SCHEME,
    id,
  };
}

export function changeStyle(style) {
  return {
    type: CHANGE_STYLE,
    style,
  };
}

export function resetText() {
  return {
    type: RESET_TEXT,
  };
}

export function updateText(text) {
  return {
    type: UPDATE_TEXT,
    text,
  };
}

export function infoShown() {
  return {
    type: INFO_SHOWN,
  };
}
