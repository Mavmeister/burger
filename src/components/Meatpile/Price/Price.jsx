import React from 'react';
import classes from './Price.css'

const Price = (props) => {
    const priceWithFormatting = props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return (
       <div className={classes.price}>
          <p> <strong>Total Cost: $ {priceWithFormatting} </strong> </p>
          <p>Total # of Ingredients:  {props.ingredientCount}  </p>
       </div>
    )

}

export default Price