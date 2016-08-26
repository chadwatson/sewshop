import React from 'react';
import { connect } from 'react-redux';
import { createStucturedSelector } from 'reselect';

import { toggleDrawer } from 'containers/App/actions';
import { selectDrawerActive } from 'containers/App/selectors';

import Button from 'components/Button';

const CartButton = ({
  style,
  size,
  drawerActive,
  toggleGlobalDrawer,
  children,
}) => (
  <Button
    style={style}
    size={size}
    onClick={() => !drawerActive && toggleGlobalDrawer()}
  >
    {children || <span>View Cart &raquo;</span>}
  </Button>
);

CartButton.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.string,
  children: React.PropTypes.node,
  drawerActive: React.PropTypes.bool,
  toggleGlobalDrawer: React.PropTypes.func,
};

const mapStateToProps = createStucturedSelector({
  drawerActive: selectDrawerActive(),
});

const mapDispatchToProps = dispatch => ({
  toggleGlobalDrawer: e => dispatch(toggleDrawer(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartButton);
