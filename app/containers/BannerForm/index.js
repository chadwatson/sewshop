import React from 'react';
import { connect } from 'react-redux';
import reactImmutableProptypes from 'react-immutable-proptypes';

import {
  selectTotal,
  selectIsValid,
} from 'containers/CustomBannerPage/selectors';
import { ID as CUSTOM_BANNER_PAGE_ID } from 'containers/CustomBannerPage/constants';
import { addProductToCart } from 'containers/Products/actions';
import { selectProductItemById } from 'containers/Products/selectors';
import { selectDrawerActive } from 'containers/App/selectors';
import { toggleDrawer } from 'containers/App/actions';

import BannerTextField from 'containers/BannerTextField';
import BannerStyleField from 'containers/BannerStyleField';
import BannerSchemeField from 'containers/BannerSchemeField';
import Wrapper from 'components/Wrapper';
import Button from 'components/Button';

import styles from './index.css';

function BannerForm({
  totalPrice,
  isValid,
  product,
  addCartItem,
  toggleCartDrawer,
  drawerActive,
}) {
  const cartButton = (
    <Button
      className={styles.button}
      disabled={!isValid}
      onClick={() => {
        if (!drawerActive) {
          toggleCartDrawer();
        }
      }}
    >View Cart &raquo;</Button>
  );
  const addButton = (
    <Button
      onClick={() => addCartItem(CUSTOM_BANNER_PAGE_ID, 1, totalPrice)}
      disabled={!isValid}
    >Add To Cart</Button>
  );

  return (
    <form className={styles.form}>
      <Wrapper size="small">
        <ol className={styles.fields}>
          <li className={styles.field}>
            <BannerTextField />
          </li>
          <li className={styles.field}>
            <BannerStyleField />
          </li>
          <li className={styles.field}>
            <BannerSchemeField />
          </li>
        </ol>
        <div className={styles.bottom}>
          <div className={styles.total}>Total: ${totalPrice}</div>
          {product.get('inCart') ? cartButton : addButton}
        </div>
      </Wrapper>
    </form>
  );
}

BannerForm.propTypes = {
  addCartItem: React.PropTypes.func,
  toggleCartDrawer: React.PropTypes.func,
  totalPrice: React.PropTypes.number,
  product: reactImmutableProptypes.map,
  isValid: React.PropTypes.bool,
  drawerActive: React.PropTypes.bool,
};

const mapStateToProps = () => {
  const getCartItem = selectProductItemById();
  const getTotalPrice = selectTotal();
  const getIsValid = selectIsValid();
  const getDrawerActive = selectDrawerActive();

  return (state) => ({
    product: getCartItem(state, CUSTOM_BANNER_PAGE_ID),
    totalPrice: getTotalPrice(state),
    isValid: getIsValid(state),
    drawerActive: getDrawerActive(state),
  });
};

const mapDispatchToProps = dispatch => ({
  addCartItem: (id, quantity, price) => dispatch(addProductToCart(id, quantity, price)),
  toggleCartDrawer: e => dispatch(toggleDrawer(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerForm);
