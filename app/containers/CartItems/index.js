import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reactImmutableProptypes from 'react-immutable-proptypes';

import { selectItemsInCart } from 'containers/Products/selectors';

import UiList from 'components/UiList';
import Button from 'components/Button';
import CartItem from 'components/CartItem';

function CartItems({ items, styles, onKeepShopping }) {
  if (items.size) {
    return (
      <UiList className={styles.cartItems}>
        {items.map((item, i) => (
          <li key={i} className={styles.cartItem}>
            <CartItem
              id={item.get('id')}
              thumb={item.get('images').first()}
              title={item.get('title')}
              quantity={item.get('quantity')}
              price={item.get('price')}
              link={`/products/${item.get('id')}`}
              styles={styles}
            />
          </li>
        ))}
      </UiList>
    );
  }

  return (
    <div>
      <p className={styles.cartMessage}>Your cart is empty.</p>
      <Button
        size="small"
        variant="dull"
        onClick={onKeepShopping}
      >Keep Shopping &raquo;</Button>
    </div>
  );
}

CartItems.propTypes = {
  items: reactImmutableProptypes.list.isRequired,
  styles: React.PropTypes.object,
  onKeepShopping: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: selectItemsInCart(),
});

export default connect(
  mapStateToProps
)(CartItems);
