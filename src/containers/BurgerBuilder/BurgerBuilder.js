import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


import * as burgerBuilderActions from '../../store/actions/index'; // index.js will be automatically picked up

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ingreds
    };
    // disable 'less' button if ingredient count is zero
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ingreds) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingreds} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              canPurchase={this.updatePurchaseState(this.props.ingreds)}
              ordered={this.purchaseHandler}
              price={this.props.price}
            />
          </Aux>
      )

      orderSummary = <OrderSummary
        ingredients={this.props.ingreds}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />

    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        { burger }
      </Aux>

    );
  }

  componentDidMount () {
    this.props.onInitIngredients()
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }
}

const mapStateToProps = state => {
  return {
    ingreds: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));