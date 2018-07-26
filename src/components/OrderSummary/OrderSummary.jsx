import React from 'react';

import ReturnsPropsChildren from '../../HOC/wrapper'

import Price from '../Meatpile/Price/Price'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}:</span> 
                    {props.ingredients[key]}
                   </li>
    })


    return (
        <ReturnsPropsChildren>
            <h3>Your Order Summary</h3>
            <p>Your order contains the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <button>Continue</button>
            <button>Cancel</button>
            <Price price={props.price} ingredientCount={props.ingredientCount}/>
        </ReturnsPropsChildren>
    )
}

export default orderSummary;