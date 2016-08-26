import React from 'react';
import {
  INITIAL_DELAY,
  INITIAL_DURATION,
} from './constants';

class FadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      transition: `${INITIAL_DURATION}ms opacity ease 0s`,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        opacity: 1,
      });
    }, INITIAL_DELAY);
  }

  render() {
    const { delay, speedInterval, children } = this.props;
    const styles = Object.assign({}, this.state, {
      transitionDelay: delay || '0s',
      transitionDuration: INITIAL_DURATION + speedInterval,
    });

    return (
      <div style={styles}>{children}</div>
    );
  }
}

FadeIn.propTypes = {
  delay: React.PropTypes.string,
  speedInterval: React.PropTypes.number,
  children: React.PropTypes.node,
};

export default FadeIn;
