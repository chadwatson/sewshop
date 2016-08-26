import React from 'react';
import Icon from 'components/Icon';
import closeIcon from './close.svg';

function CloseButton({
  size = 16,
  onClick,
  value,
  fill,
  className,
  children,
}) {
  return (
    <button type="button" value={value} onClick={onClick} className={className}>
      {children}<Icon glyph={closeIcon} width={size} fill={fill} />
    </button>
  );
}

CloseButton.propTypes = {
  size: React.PropTypes.number,
  onClick: React.PropTypes.func,
  value: React.PropTypes.string,
  fill: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default CloseButton;
