import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changeStyle } from 'containers/CustomBannerPage/actions';
import { STYLE_FLOWERS, STYLE_TRIANGLES } from 'containers/CustomBannerPage/constants';
import { selectStyle } from 'containers/CustomBannerPage/selectors';

import Button from 'components/Button';
import VisuallyHidden from 'components/VisuallyHidden';
import FormLabel from 'components/FormLabel';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

class BannerStyleField extends Component {

  static propTypes = {
    currentStyle: React.PropTypes.string,
    changeStyle: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isFocused: false,
    };
  }

  handleChange(e) {
    this.props.changeStyle(e.target.value);
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    const { currentStyle } = this.props;
    const { isFocused } = this.state;
    const styleOptions = [STYLE_FLOWERS, STYLE_TRIANGLES];

    return (
      <div className={cx({ root: true, isFocused })}>
        {styleOptions.map((style, i) => (
          <label htmlFor={style} className={styles.item} key={i}>
            <VisuallyHidden>
              <input
                id={style}
                type="radio"
                name="style"
                value={style}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                checked={currentStyle === style}
              />
            </VisuallyHidden>
            <Button
              variant={currentStyle === style ? 'default' : 'inactive'}
              stylesOnly
            >{captialize(style)}</Button>
          </label>
        ))}
        <FormLabel isActive={isFocused} animatedText={false}>Your Style</FormLabel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentStyle: selectStyle(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerStyleField);

function mapDispatchToProps(dispatch) {
  return {
    changeStyle: styleName => dispatch(changeStyle(styleName)),
  };
}

function captialize(string) {
  return [string.slice(0, 1).toUpperCase(), string.slice(1).toLowerCase()];
}
