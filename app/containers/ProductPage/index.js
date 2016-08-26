import React from 'react';
import { connect } from 'react-redux';
import { MatchMedia } from 'react-match-media';
import { Link } from 'react-router';
import reactImmutableProptypes from 'react-immutable-proptypes';

import { breakpoints, coolWords } from 'containers/App/constants';
import { selectDrawerActive } from 'containers/App/selectors';
import { toggleDrawer } from 'containers/App/actions';
import { path as checkoutPath } from 'components/CheckoutButton/constants';
import { addProductToCart, updateProductQuantity } from 'containers/Products/actions';
import { selectProductItemById } from 'containers/Products/selectors';

import Headline from 'components/Headline';
import Button from 'components/Button';
import Wrapper from 'components/Wrapper';
import SquareImage from 'components/SquareImage';
import Gallery from 'components/Gallery';
import RichText from 'components/RichText';
import QuantityPicker from 'components/QuantityPicker';
import KeepShoppingButton from 'components/KeepShoppingButton';

import styles from './index.css';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  getAddedMessage(quantity, title) {
    const multiple = quantity > 1;
    const item = multiple ? `${title}s` : title;
    const verb = multiple ? 'are' : 'is';

    return `${quantity} ${item} ${verb} in your cart.`;
  }

  handleDecrement() {
    const { product } = this.props;
    this.updateQuantity(product.get('quantity') - 1);
  }

  handleIncrement() {
    const { product } = this.props;
    this.updateQuantity(product.get('quantity') + 1);
  }

  handleQuantityChange(e) {
    this.updateQuantity(e.target.value);
  }

  updateQuantity(quantity) {
    if (quantity === 0) {
      return;
    }

    const { product } = this.props;

    this.props.updateQuantity(product.get('id'), quantity);
  }

  handleAdd() {
    const { product } = this.props;

    this.props.addToCart(product.get('id'), product.get('quantity'));
  }

  render() {
    const { product, drawerActive, toggleCartDrawer } = this.props;

    const addButton = <Button onClick={this.handleAdd}>Add To Cart</Button>;
    const cartButton = (
      <Button
        className={styles.button}
        onClick={() => {
          if (!drawerActive) {
            toggleCartDrawer();
          }
        }}
      >View Cart</Button>
    );

    const feedback = (() => {
      if (!product.get('inCart')) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * (coolWords.length - 1)) + 1;
      const coolWord = coolWords[randomIndex];

      return (
        <div className={styles.message}>
          <RichText>
            <p><strong>{coolWord}</strong> {this.getAddedMessage(product.get('quantity'), product.get('title'))}</p>
            <div className={styles.actionButtons}>
              <div className={styles.actionButton}>
                <KeepShoppingButton size="small" />
              </div>
              <div className={styles.actionButton}>
                <Button
                  linkTo={checkoutPath}
                  variant="dull"
                  size="small"
                >Checkout &raquo;</Button>
              </div>
            </div>
          </RichText>
        </div>
      );
    })();

    return (
      <Wrapper size="large">
        <article className={styles.root}>
          <div className={styles.backWrap}>
            <Link to="/" className={styles.backLink}>All</Link>
          </div>
          <div className={styles.main}>
            <figure className={styles.gallery}>
              <div className={styles.galleryWrap}>
                <MatchMedia mediaQuery={`(max-width: ${breakpoints.medium})`}>
                  <div className={styles.strip}>
                    {product.get('images').map((image, i) => (
                      <div className={styles.stripImage} key={i}>
                        <SquareImage image={image} key={i} />
                      </div>
                    ))}
                  </div>
                </MatchMedia>
                <MatchMedia mediaQuery={`(min-width: ${breakpoints.medium})`}>
                  <Gallery slides={product.get('images')} />
                </MatchMedia>
              </div>
            </figure>
            <div className={styles.content}>
              <header>
                <h1 className={styles.title}>
                  <Headline fontSize="5.4rem">{product.get('title')}</Headline>
                </h1>
              </header>
              <RichText>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: product.get('description') }}
                ></div>
              </RichText>
              <div className={styles.addWrap}>
                <div className={styles.quantityWrap}>
                  <QuantityPicker
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                    onManualChange={this.handleQuantityChange}
                    quantity={product.get('quantity')}
                  />
                </div>
                {product.get('inCart') ? cartButton : addButton}
              </div>
              {feedback}
            </div>
          </div>
        </article>
      </Wrapper>
    );
  }
}

ProductPage.propTypes = {
  product: reactImmutableProptypes.map,
  drawerActive: React.PropTypes.bool,
  updateQuantity: React.PropTypes.func,
  toggleCartDrawer: React.PropTypes.func,
  addToCart: React.PropTypes.func,
};

const mapStateToProps = () => {
  const getProduct = selectProductItemById();
  const getDrawerActive = selectDrawerActive();

  return (state, props) => ({
    product: getProduct(state, props.params.id),
    drawerActive: getDrawerActive(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id, quantity) => dispatch(addProductToCart(id, quantity)),
  updateQuantity: (id, quantity) => dispatch(updateProductQuantity(id, quantity)),
  toggleCartDrawer: e => dispatch(toggleDrawer(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
