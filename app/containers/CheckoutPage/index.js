import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Field, Form } from 'react-redux-form';
import StripeCheckout from 'react-stripe-checkout';
import Headline from 'components/Headline';
import Wrapper from 'components/Wrapper';
import NakedInput from 'components/NakedInput';
import Grid from 'components/Grid';
import FormLabel from 'components/FormLabel';
import CartItems from 'containers/CartItems';
import KeepShoppingButton from 'components/KeepShoppingButton';
import Button from 'components/Button';

import { selectCartTotal, selectCartHasItems } from 'containers/Products/selectors';
import { selectCustomer } from 'containers/App/selectors';
import { APP_NAME, STRIPE_KEY } from 'containers/App/constants';
import logo from 'components/Logo/logo-small.png';

import classnames from 'classnames/bind';
import styles from './index.css';
const cx = classnames.bind(styles);

class Checkout extends Component {

  static propTypes = {
    customer: React.PropTypes.object,
    cartHasItems: React.PropTypes.bool,
    cartTotal: React.PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeField: null,
    };
  }

  onToken() {
    // TODO: do something...
  }

  render() {
    const { activeField } = this.state;
    const { customer, cartHasItems, cartTotal } = this.props;
    const amount = /\.[0-9]{2}$/.test(cartTotal) ? cartTotal : cartTotal * 100;

    return (
      <Wrapper size="large">
        <h2 className={styles.title}>
          <Headline>Checkout</Headline>
        </h2>

        <Grid medium={2}>

          <div className={styles.section}>
            <div className={cx({ sectionTitle: true, cartTitle: true })}>
              <h3>Review your cart:</h3>
              {cartHasItems ? <div>Total: ${cartTotal}</div> : null}
            </div>
            <div className={styles.sectionContainer}>
              <CartItems styles={styles} />
            </div>
            <div className={styles.cartBottom}>
              <p className={styles.cartMessage}>Not ready to check out yet?</p>
              <KeepShoppingButton small />
            </div>
          </div>

          {(() => {
            if (cartHasItems) {
              return (
                <div className={styles.section}>
                  <Form model="customer">
                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>Contact Info</h3>
                      <div className={styles.sectionContainer}>
                        <Grid mini={2}>
                          <div className={styles.field}>
                            <NakedInput>
                              <Field model="customer.firstName">
                                <input
                                  className={styles.input}
                                  type="text"
                                  id="first-name"
                                  placeholder="First Name"
                                  onFocus={() => this.setState({ activeField: 'first-name' })}
                                  onBlur={() => this.setState({ activeField: null })}
                                />
                              </Field>
                            </NakedInput>
                            <FormLabel
                              showAnimatedText={customer.firstName}
                              isActive={activeField === 'first-name'}
                            >First Name</FormLabel>
                          </div>

                          <div className={styles.field}>
                            <NakedInput>
                              <Field model="customer.lastName">
                                <input
                                  className={styles.input}
                                  type="text"
                                  id="last-name"
                                  placeholder="Last Name"
                                  onFocus={() => this.setState({ activeField: 'last-name' })}
                                  onBlur={() => this.setState({ activeField: null })}
                                />
                              </Field>
                            </NakedInput>
                            <FormLabel
                              showAnimatedText={customer.lastName}
                              isActive={activeField === 'last-name'}
                            >Last Name</FormLabel>
                          </div>
                        </Grid>

                        <div className={styles.field}>
                          <NakedInput>
                            <Field model="customer.email">
                              <input
                                className={styles.input}
                                type="email"
                                id="email"
                                placeholder="Email"
                                onFocus={() => this.setState({ activeField: 'email' })}
                                onBlur={() => this.setState({ activeField: null })}
                              />
                            </Field>
                          </NakedInput>
                          <FormLabel
                            showAnimatedText={customer.email}
                            isActive={activeField === 'email'}
                          >Email</FormLabel>
                        </div>
                      </div>
                    </div>

                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>Delivery</h3>
                      <div className={styles.sectionContainer}>
                        <div className={styles.field}>
                          <NakedInput>
                            <Field model="customer.address1">
                              <input
                                className={styles.input}
                                type="text"
                                id="address1"
                                placeholder="Address 1"
                                onFocus={() => this.setState({ activeField: 'address1' })}
                                onBlur={() => this.setState({ activeField: null })}
                              />
                            </Field>
                          </NakedInput>
                          <FormLabel
                            showAnimatedText={customer.address1}
                            isActive={activeField === 'address1'}
                          >Address 1</FormLabel>
                        </div>

                        <div className={styles.field}>
                          <NakedInput>
                            <Field model="customer.address2">
                              <input
                                className={styles.input}
                                type="text"
                                id="address2"
                                placeholder="Address 2"
                                onFocus={() => this.setState({ activeField: 'address2' })}
                                onBlur={() => this.setState({ activeField: null })}
                              />
                            </Field>
                          </NakedInput>
                          <FormLabel
                            showAnimatedText={customer.address2}
                            isActive={activeField === 'address2'}
                          >Address 2</FormLabel>
                        </div>

                        <Grid mini={2}>
                          <div className={styles.field}>
                            <NakedInput>
                              <Field model="customer.city">
                                <input
                                  className={styles.input}
                                  type="text"
                                  id="city"
                                  placeholder="City"
                                  onFocus={() => this.setState({ activeField: 'city' })}
                                  onBlur={() => this.setState({ activeField: null })}
                                />
                              </Field>
                            </NakedInput>
                            <FormLabel
                              showAnimatedText={customer.city}
                              isActive={activeField === 'city'}
                            >City</FormLabel>
                          </div>

                          <div className={styles.field}>
                            <NakedInput>
                              <Field model="customer.state">
                                <input
                                  className={styles.input}
                                  type="text"
                                  id="state"
                                  placeholder="State"
                                  maxLength="2"
                                  onFocus={() => this.setState({ activeField: 'state' })}
                                  onBlur={() => this.setState({ activeField: null })}
                                />
                              </Field>
                            </NakedInput>
                            <FormLabel
                              showAnimatedText={customer.state}
                              isActive={activeField === 'state'}
                            >State</FormLabel>
                          </div>
                        </Grid>

                        <div className={styles.field}>
                          <NakedInput>
                            <Field model="customer.zip">
                              <input
                                className={styles.input}
                                type="text"
                                id="zip"
                                placeholder="Zipcode"
                                onFocus={() => this.setState({ activeField: 'zip' })}
                                onBlur={() => this.setState({ activeField: null })}
                              />
                            </Field>
                          </NakedInput>
                          <FormLabel
                            showAnimatedText={customer.zip}
                            isActive={activeField === 'zip'}
                          >Zip</FormLabel>
                        </div>

                      </div>
                    </div>

                    <StripeCheckout
                      name={APP_NAME}
                      amount={amount}
                      token={this.onToken}
                      image={logo}
                      email={customer.email}
                      stripeKey={STRIPE_KEY}
                    >
                      <Button>Pay With Card</Button>
                    </StripeCheckout>

                  </Form>
                </div>
              );
            }

            return null;
          })()}

        </Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  customer: selectCustomer(),
  cartTotal: selectCartTotal(),
  cartHasItems: selectCartHasItems(),
});

export default connect(
  mapStateToProps
)(Checkout);
