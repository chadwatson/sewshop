/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reactImmutableProptypes from 'react-immutable-proptypes';

import { selectAllProductItems } from 'containers/Products/selectors';

import Products from 'components/Products';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    products: reactImmutableProptypes.list,
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <Products products={products} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: selectAllProductItems(),
});

export default connect(mapStateToProps)(HomePage);
