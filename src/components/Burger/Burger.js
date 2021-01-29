import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients) // Converts object keys to array ["salad", "bacon"...]
    .map(igKey => { // The .map method runs through the array, igKey is "salad", "bacon" etc, once for each array item
      //
      // Explanation of body of .map function as it took me a while to figure this out:
      // Note: the Spread operator is used to create a new array where each element is undefined rather than empty,
      // which it would be if we just had Array(). This would break the .map method.
      //
      // For each item in the above array, the Spread operator creates a new Array using the Array() constructor
      // with props.ingredients[igKey] giving the length, so for cheese and meat it will be Array(2), so .map will
      // loop through those arrays twice. The _ parameter passed to map is an undefined element, but the index i is useful
      // in the array to create a BurgerIngredient of the required type with i contributing to the key which must be
      // unique.
      //
      // const newArray = Array(props.ingredients[igKey]);
      // console.log(newArray);
      // const spreadArray = [...newArray];
      // console.log(spreadArray);
      // return spreadArray.map((_, i) => {
      //
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;