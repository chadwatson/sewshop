import { createSelector } from 'reselect';

export const selectGlobal = () => (state) => state.get('global');

export const selectDrawerActive = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('drawerActive')
);

export const selectCustomer = () => (state) => state.get('customer');

// selectLocationState expects a plain JS object for the routing state
export const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
