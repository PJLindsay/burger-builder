import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const BASE_PRICE_BURGER = 4;

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE_BURGER,
  error: false,
  building: false // is user making a burger? (if need to login we will remember and redirect to their order after sign-in)
};

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.25
};

const addIngredient = (state, action) => {
  const addedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const itemsWithAddition = updateObject(state.ingredients, addedIngredient)
  const addedState = {
    ingredients: itemsWithAddition,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, addedState);
}

const removeIngredient = (state, action) => {
  const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const itemsWithRemoval = updateObject(state.ingredients, removedIngredient)
  const removedState = {
    ingredients: itemsWithRemoval,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, removedState);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: BASE_PRICE_BURGER,
    error: false,
    building: false
  })
}

const reducer = ( state = initialState, action ) => {

  switch (action.type) {

    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;