import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Checkout extends Component {

  // componentDidMount () {
  //   this.props.onInitPurchase();
  // }

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
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null

      summary = (
        <div>
          {purchasedRedirect}
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
    ingreds: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
}



export default connect(mapStateToProps)(Checkout);
