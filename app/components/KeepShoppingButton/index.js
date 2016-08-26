import React from 'react';
import Button from 'components/Button';

const KeepShoppingButton = ({ size = 'normal', onClick }) => (
  <Button
    linkTo="/"
    size={size}
    variant="dull"
    title="Keep Shopping"
    onClick={onClick}
  >Keep Shopping &raquo;</Button>
);

KeepShoppingButton.propTypes = {
  size: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default KeepShoppingButton;
