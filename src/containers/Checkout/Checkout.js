import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    // redirect in case you are on Checkout page but no ingredients are loaded (e.g. page refresh)
    let summary = <Redirect to="/"/>

    if (this.props.ingreds) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingreds}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />

          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}


const mapStateToProps = state => {
  return {
    ingreds: state.burgerBuilder.ingredients
  };
}


export default connect(mapStateToProps)(Checkout);
