import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      });
    } )
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

    // console.log(transformedIngredients)
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Add ingredients to your burger now!</p>
    }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

// wrap withRouter so top-level component passes down route properties (match, history, location)
export default withRouter(burger);