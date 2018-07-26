import React from 'react';

import SingleControl from './SingleControl/SingleControl'
import classes from './Controls.css'

const listOfControls = [
    {label: 'Salad', type: 'salad' },
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Slush', type: 'slush'}
]

const Controls = (props) => {
    return (
      <div className={classes.BuildControls}>
        <button 
          className={classes.OrderButton}
          disabled={!props.isPurchasable}
          onClick={props.purchaseHandler}>
          Checkout 
        </button>
        {listOfControls.map(ingredientControl => {
            return <SingleControl
               added={() => props.ingredientAdded(ingredientControl.type)}
               removed={() => props.ingredientRemoved(ingredientControl.type)}
               key={ingredientControl.label}
               label={ingredientControl.label} 
               disabled={props.disabled[ingredientControl.type]}
            />
        })}
      </div>
    )
}

export default Controls;