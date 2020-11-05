import * as actionTypes from './actions';

const BASE_PRICE_BURGER = 4;

const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: BASE_PRICE_BURGER,
};

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.25
};

const reducer = ( state = initialState, action ) => {

  switch (action.type) {

    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    default:
      return state;
  }
};

export default reducer;