import { createSelector } from 'reselect';
import { ID } from './constants';

export const selectBanner = () => state => state.get('banner');

export function selectStyle() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('style'),
  );
}

export function selectText() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('text'),
  );
}

export function selectColors() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('colors'),
  );
}

export function selectCurrentScheme() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('currentScheme'),
  );
}

export function selectIsValid() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('isValid'),
  );
}

export function selectInfoShown() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('infoShown'),
  );
}

export function selectBannerInCart() {
  return createSelector(
    selectItems(),
    items => items.find(item => item.get('id') === ID),
  );
}

export function selectTotal() {
  return createSelector(
    selectBanner(),
    bannerState => bannerState.get('total'),
  );
}
