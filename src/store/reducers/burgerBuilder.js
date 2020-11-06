import * as actionTypes from '../actions/actionTypes';

const BASE_PRICE_BURGER = 4;

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE_BURGER,
  error: false
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

      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: action.ingredients,
          totalPrice: BASE_PRICE_BURGER,
          error: false
        };

      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true
        };

    default:
      return state;
  }
};

export default reducer;