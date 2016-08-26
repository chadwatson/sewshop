import React from 'react';
import Button from 'components/Button';
import { path } from './constants';

function CheckoutButton({ small = false, onClick }) {
  return (
    <Button
      linkTo={path}
      size={small ? 'small' : 'normal'}
      title="Checkout"
      onClick={onClick}
    >Checkout &raquo;</Button>
  );
}

CheckoutButton.propTypes = {
  small: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default CheckoutButton;
