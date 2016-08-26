import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { removeProductFromCart, updateProductQuantity } from 'containers/Products/actions';
import { path as productPath } from 'containers/ProductPage/constants';

import QuantityPicker from 'components/QuantityPicker';
import VisuallyHidden from 'components/VisuallyHidden';
import SquareImage from 'components/SquareImage';
import CloseButton from 'components/CloseButton';
import ConfirmModal from 'components/ConfirmModal';

import styles from './index.css';

class CartItem extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    quantity: React.PropTypes.number,
    price: React.PropTypes.number,
    title: React.PropTypes.string,
    thumb: React.PropTypes.string,
    updateQuantity: React.PropTypes.func,
    remove: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.remove = this.remove.bind(this);

    this.state = {
      confirmingRemove: false,
    };
  }

  handleIncrement() {
    const { id, quantity } = this.props;
    this.props.updateQuantity(id, quantity + 1);
  }

  handleDecrement() {
    const { id, quantity } = this.props;
    this.stayPositive(id, quantity - 1);
  }

  handleQuantityChange(e) {
    this.stayPositive(this.props.id, e.target.value);
  }

  stayPositive(id, quantity) {
    if (quantity > 0) {
      this.props.updateQuantity(id, quantity);
    }
  }

  remove() {
    this.props.remove(this.props.id);
    this.setState({ removeItem: false });
  }

  render() {
    const { thumb, title, quantity, price, id } = this.props;
    const { confirmingRemove } = this.state;

    const confirmModal = (() => {
      if (!confirmingRemove) {
        return null;
      }

      const productTitle = (() => {
        if (quantity > 1 && title.charAt(title.length - 1) !== 's') {
          return `${title}s`;
        }

        return title;
      })();

      return (
        <ConfirmModal
          message={`Are you sure you want to remove ${quantity} ${productTitle} from your cart?`}
          confirmVal="Remove"
          cancelVal="Cancel"
          onConfirm={this.remove}
          onCancel={() => this.setState({ confirmingRemove: false })}
        />
      );
    })();

    return (
      <div className={styles.root}>
        <div className={styles.thumbWrap}>
          <Link to={`/${productPath}/${id}`}>
            <SquareImage image={thumb} />
          </Link>
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}><Link to={`/${productPath}/${id}`}>{title}</Link></h3>
          <div>
            <div className={styles.quantity}>
              <QuantityPicker
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onManualChange={this.handleQuantityChange}
                quantity={quantity}
              />
            </div>
            <strong className={styles.price}>${price}</strong>
          </div>
        </div>
        <CloseButton
          value={id}
          size={10}
          className={styles.removeButton}
          onClick={() => this.setState({ confirmingRemove: true })}
        >
          <VisuallyHidden>Remove {title}</VisuallyHidden>
        </CloseButton>
        {confirmModal}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CartItem);

function mapDispatchToProps(dispatch) {
  return {
    remove: (id) => dispatch(removeProductFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateProductQuantity(id, quantity)),
  };
}
