import React from 'react';
import IconButton from 'components/IconButton';
import icon from './info.svg';

function InfoButton({ width, value, onClick }) {
  return (
    <IconButton
      width={width}
      value={value}
      onClick={onClick}
      icon={icon}
    />
  );
}

InfoButton.propTypes = {
  width: React.PropTypes.string,
  value: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default InfoButton;
