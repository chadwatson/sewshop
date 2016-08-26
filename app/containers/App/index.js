/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { RouteTransition } from 'react-router-transition';

import { createStructuredSelector } from 'reselect';
import { selectDrawerActive } from './selectors';
import { selectCartHasItems } from 'containers/Products/selectors';

import Header from 'components/Header';
import Footer from 'components/Footer';
import CartDrawer from 'components/CartDrawer';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    drawerActive: React.PropTypes.bool,
    cartHasItems: React.PropTypes.bool,
    location: React.PropTypes.object,
  }

  render() {
    const {
      cartHasItems,
      drawerActive,
      children,
      location,
    } = this.props;

    return (
      <div>
        <div className={cx({ mainWrap: true, drawerActive })}>
          <Header />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
        </div>
        {location.pathname !== '/checkout' && cartHasItems && <CartDrawer />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  drawerActive: selectDrawerActive(),
  cartHasItems: selectCartHasItems(),
});

export default connect(mapStateToProps)(App);
