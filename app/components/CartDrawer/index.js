import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reactImmutableProptypes from 'react-immutable-proptypes';

import { selectDrawerActive } from 'containers/App/selectors';
import { selectAllProductItems, selectCartTotal } from 'containers/Products/selectors';
import { toggleDrawer } from 'containers/App/actions';
import { colors } from 'containers/App/constants';

import CloseButton from 'components/CloseButton';
import CheckoutButton from 'components/CheckoutButton';
import CartIcon from 'components/CartIcon';
import CartItems from 'containers/CartItems';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

class CartDrawer extends Component {

  static propTypes = {
    toggleDrawer: React.PropTypes.func,
    isActive: React.PropTypes.bool,
    products: reactImmutableProptypes.list,
    total: React.PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  open() {
    if (!this.props.isActive) {
      this.props.toggleDrawer();
    }
  }

  close() {
    if (this.props.isActive) {
      this.props.toggleDrawer();
    }
  }

  toggle() {
    this.props.toggleDrawer();
  }

  render() {
    const { products, total, isActive } = this.props;
    const hasItems = Boolean(products.size);

    return (
      <div
        className={cx({
          root: true,
          hasItems,
          isActive,
        })}
      >
        <button
          type="button"
          className={styles.openButton}
          onClick={this.toggle}
          title="View Cart"
        >
          <CartIcon
            fill="white"
            active={hasItems}
            activeFillPrimary="white"
            activeFillSecondary={colors.mintLeaf}
          />
        </button>
        <h2 className={styles.headline}>Your Cart</h2>
        <div className={styles.content}>
          <CartItems styles={styles} onKeepShopping={() => this.close()} />
        </div>
        {hasItems ? (
          <div className={styles.bottom}>
            <div className={styles.total}>Total: ${total}</div>
            <CheckoutButton onClick={this.close} />
          </div>
        ) : null}
        <div className={styles.closeButton}>
          <CloseButton onClick={this.close} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  total: selectCartTotal(),
  isActive: selectDrawerActive(),
  products: selectAllProductItems(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDrawer);

function mapDispatchToProps(dispatch) {
  return {
    toggleDrawer: e => dispatch(toggleDrawer(e)),
  };
}
