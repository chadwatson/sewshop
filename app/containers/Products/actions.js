import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from './constants';

export function addProductToCart(id, quantity, price) {
  return {
    type: ADD_TO_CART,
    id,
    quantity,
    price,
  };
}

export function removeProductFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
}

export function updateProductQuantity(id, quantity) {
  return {
    type: UPDATE_QUANTITY,
    id,
    quantity,
  };
}
