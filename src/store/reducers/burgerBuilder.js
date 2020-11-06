import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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
      const addedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const itemsWithAddition = updateObject(state.ingredients, addedIngredient)
      const addedState = {
        ingredients: itemsWithAddition,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      return updateObject(state, addedState);

    case actionTypes.REMOVE_INGREDIENT:
      const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const itemsWithRemoval = updateObject(state.ingredients, removedIngredient)
      const removedState = {
        ingredients: itemsWithRemoval,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      return updateObject(state, removedState);

      case actionTypes.SET_INGREDIENTS:
        return updateObject(state, {
          ingredients: action.ingredients,
          totalPrice: BASE_PRICE_BURGER,
          error: false
        })

      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;