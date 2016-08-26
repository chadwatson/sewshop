import { createSelector } from 'reselect';

export const selectProducts = () => (state) => state.get('products');

export const selectAllProductItems = () => createSelector(
  selectProducts(),
  (productsState) => productsState.get('items')
);

const getProductItemById = (state, id) =>
  state.get('products').get('items').find(item => item.get('id') === id);

export const selectProductItemById = () => createSelector(
  [getProductItemById],
  (item) => item
);

export const selectItemsInCart = () => createSelector(
  selectProducts(),
  (productsState) =>
    productsState.get('cartItems').map(itemId =>
      productsState.get('items').find(item => item.get('id') === itemId)
    )
);

export const selectCartTotal = () => createSelector(
  selectProducts(),
  (productsState) => productsState.get('cartTotal')
);

export const selectCartHasItems = () => createSelector(
  selectAllProductItems(),
  (items) => Boolean(items.size)
);
