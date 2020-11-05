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
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;