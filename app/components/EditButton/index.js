import React from 'react';
import IconButton from 'components/IconButton';
import icon from './edit.svg';

function EditButton({ value, onClick }) {
  return <IconButton value={value} onClick={onClick} icon={icon} />;
}

EditButton.propTypes = {
  value: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default EditButton;
