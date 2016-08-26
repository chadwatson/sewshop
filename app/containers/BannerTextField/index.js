import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updateText, resetText } from 'containers/CustomBannerPage/actions';
import { selectText } from 'containers/CustomBannerPage/selectors';
import { INITIAL_TEXT } from 'containers/CustomBannerPage/constants';

import NakedInput from 'components/NakedInput';
import FormLabel from 'components/FormLabel';
import CompleteButton from 'components/CompleteButton';
import EditButton from 'components/EditButton';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

class BannerTextField extends Component {

  static propTypes = {
    text: React.PropTypes.string,
    updateText: React.PropTypes.func,
    resetText: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setRef = this.setRef.bind(this);

    const isReady = props.text !== INITIAL_TEXT;
    this.state = {
      isEditing: !isReady,
      isActive: false,
      isReady,
    };
  }

  componentDidMount() {
    if (!this.state.isReady) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    if (this.state.isEditing) {
      if (this.props.text === INITIAL_TEXT) {
        this.selectAll();
      }
    }
  }

  setRef(c) {
    this.input = c;
  }

  handleCommit() {
    this.setState({ isReady: true, isEditing: false });
    this.input.blur();
  }

  handleEdit() {
    this.setState({ isEditing: true });
    this.input.focus();
  }

  handleChange(e) {
    this.props.updateText(e.target.value);

    if (!e.target.value || e.target.value === INITIAL_TEXT) {
      this.setState({ isReady: false });
    } else {
      this.setState({ isReady: true });
    }
  }

  handleFocus() {
    this.setState({ isEditing: true, isActive: true });
  }

  handleBlur(e) {
    let isReady = true;

    if (!e.target.value) {
      this.props.resetText();
      isReady = false;
    }

    this.setState({
      isEditing: false,
      isActive: false,
      isReady,
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleCommit(e);
    }
  }

  selectAll() {
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const { text } = this.props;
    const { isReady, isEditing, isActive } = this.state;

    return (
      <div className={cx({ root: true, isReady, isEditing, isActive })}>
        <NakedInput style={{ paddingRight: '30px' }}>
          <input
            className={styles.input}
            type="text"
            id="banner-text"
            value={text}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            autoComplete="off"
            ref={this.setRef}
          />
        </NakedInput>
        <div className={styles.buttonWrap}>
          {(() => {
            if (!isEditing) {
              return <EditButton onClick={this.handleEdit} />;
            }

            return <CompleteButton onClick={this.handleCommit} />;
          })()}
        </div>
        <FormLabel
          htmlFor="banner-text"
          isActive={isActive}
          animatedText={false}
        >Your Text</FormLabel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  text: selectText(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerTextField);

function mapDispatchToProps(dispatch) {
  return {
    updateText: e => dispatch(updateText(e)),
    resetText: e => dispatch(resetText(e)),
  };
}
