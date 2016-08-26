import React from 'react';
import { colors } from 'containers/App/constants';
import logo from './logo.svg';

function Logo({ fill = colors.licorice, className }) {
  return (
    <svg className={className} fill={fill} width="100%" height="120">
      <use xlinkHref={logo} />
    </svg>
  );
}

Logo.propTypes = {
  fill: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Logo;
