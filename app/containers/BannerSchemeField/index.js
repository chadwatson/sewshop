import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changeScheme } from 'containers/CustomBannerPage/actions';
import { selectCurrentScheme } from 'containers/CustomBannerPage/selectors';
import { colorSchemes } from 'containers/App/constants';

import VisuallyHidden from 'components/VisuallyHidden';
import FormLabel from 'components/FormLabel';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

class BannerSchemeField extends Component {

  static propTypes = {
    currentScheme: React.PropTypes.number,
    changeScheme: React.PropTypes.func,
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
    const newScheme = parseInt(e.target.value, 10);

    if (newScheme !== this.props.currentScheme) {
      this.props.changeScheme(newScheme);
    }
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    const { currentScheme } = this.props;
    const { isFocused } = this.state;
    const accentsPerRow = 2;
    const viewUnit = 100;
    const accentSize = viewUnit / accentsPerRow;

    return (
      <div className={cx({ root: true, isFocused })}>
        <VisuallyHidden>
          <label>Choose your colors:</label>
        </VisuallyHidden>
        <div className={styles.items}>
          {colorSchemes.map((scheme, i) => {
            const id = `scheme-${i}`;

            return (
              <div
                key={i}
                className={cx({
                  item: true,
                  isActive: currentScheme === i,
                })}
              >
                <VisuallyHidden>
                  <input
                    type="radio"
                    id={id}
                    name="scheme"
                    value={i}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    checked={currentScheme === i}
                    className={styles.radio}
                  />
                </VisuallyHidden>
                <label htmlFor={id} className={styles.swatch}>
                  <svg viewBox={`0 0 ${viewUnit} ${viewUnit}`} className={styles.svg}>
                    {scheme.accents.map((color, k) => {
                      const pos = k % accentsPerRow;
                      const x1 = pos * accentSize;
                      const y1 = (pos === 0) ? ((k / accentsPerRow) * accentSize) : Math.floor((k / accentsPerRow)) * accentSize;
                      const x2 = x1 + accentSize;
                      const y2 = y1 + accentSize;

                      return (
                        <polygon
                          points={`${x1} ${y1}, ${x2} ${y1}, ${x2} ${y2}, ${x1} ${y2}`}
                          key={k}
                          fill={color}
                        ></polygon>
                      );
                    })}
                  </svg>
                </label>
              </div>
            );
          })}
        </div>
        <FormLabel isActive={isFocused} animatedText={false}>Your Colors</FormLabel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentScheme: selectCurrentScheme(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerSchemeField);

function mapDispatchToProps(dispatch) {
  return {
    changeScheme: e => dispatch(changeScheme(e)),
  };
}
