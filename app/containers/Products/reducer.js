import { fromJS } from 'immutable';
import items from './data.json';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from './constants';

const initialState = fromJS({
  items,
  cartItems: [],
  cartTotal: 0,
});

export default function productsReducer(state = initialState, action) {
  const targetItem = state.get('items').find(item => item.get('id') === action.id);
  const itemIndex = state.get('items').indexOf(targetItem);
  const cartItemIndex = state.get('cartItems').indexOf(action.id);

  let newItems;
  let newCartItems;

  switch (action.type) {
    case ADD_TO_CART:
      newCartItems = state.get('cartItems').push(action.id);
      newItems = state.get('items')
        .update(itemIndex, (item) =>
          item
            .set('quantity', action.quantity)
            .set('price', action.price || item.get('price'))
            .set('inCart', true)
        );

      return state
        .set('items', newItems)
        .set('cartItems', newCartItems)
        .set('cartTotal', getTotal(newCartItems, newItems));

    case REMOVE_FROM_CART:
      newCartItems = state.get('cartItems').delete(cartItemIndex);
      newItems = state.get('items')
        .update(itemIndex, (item) =>
          item
            .set('quantity', 1)
            .set('inCart', false)
        );

      return state
        .set('items', newItems)
        .set('cartItems', newCartItems)
        .set('cartTotal', getTotal(newCartItems, newItems));

    case UPDATE_QUANTITY:
      newItems = state.get('items').update(itemIndex, (item) => item.set('quantity', action.quantity));

      return state
        .set('items', newItems)
        .set('cartTotal', getTotal(state.get('cartItems'), newItems));

    default:
      return state;
  }
}

function getTotal(cartItems, allItems) {
  return cartItems.reduce((total, item) => {
    const product = allItems.find(i => i.get('id') === item);
    return total + product.get('quantity') * product.get('price');
  }, 0);
}
