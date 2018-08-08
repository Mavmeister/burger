import React from 'react'

import classes from './Meat.css';
import BurgerIngredient from './MeatIngredients/MeatIngredient'

const Meat = (props) => {
    // turn object to array for props
    let BurgerWithProps = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]
              .map((_, index) => {
                  return <BurgerIngredient
                  // array of JSX elements always needs a key
                      key={ingredientKey + index}
                  // key is salad, bacon, etc
                      type={ingredientKey}  
                  />
              })
        })
        // flattens array to single array
        .reduce((prev, current) => {
            return prev.concat(current)
            console.log(prev, current)
        }, [])

        if (BurgerWithProps.length === 0){
            BurgerWithProps = <p>Please add some ingredients</p>
        }
    // extra keys of given object, turns array

    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top" />
                {BurgerWithProps}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Meat;