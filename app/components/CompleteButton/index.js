import React from 'react';
import IconButton from 'components/IconButton';
import icon from './checkmark.svg';

function CompleteButton({ value, onClick }) {
  return <IconButton value={value} onClick={onClick} icon={icon} />;
}

CompleteButton.propTypes = {
  value: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default CompleteButton;
