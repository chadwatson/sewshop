import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick(e) {
    e.preventDefault();

    const { to, changeRoute, onClick } = this.props;

    changeRoute(to);

    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const { to, title, children } = this.props;

    return (
      <a
        href={to}
        onClick={this.handleLinkClick}
        title={title}
      >{children}</a>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(push(url)),
  };
}

Link.propTypes = {
  style: React.PropTypes.object,
  to: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
  children: React.PropTypes.node,
};

export default connect(null, mapDispatchToProps)(Link);
