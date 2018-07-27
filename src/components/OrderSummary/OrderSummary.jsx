import React from 'react';

import ReturnsPropsChildren from '../../HOC/wrapper'

import Price from '../Burger/Price/Price'
import Button from '../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}:  </span> 
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
            <p> <strong> Continue to Checkout? </strong></p>
            <Button buttonType="Danger" clicked={props.cancelClicked}> Cancel </Button>
            <Button buttonType="Success" clicked={props.continueClicked}> Continue </Button>
            <Price price={props.price} ingredientCount={props.ingredientCount}/>
        </ReturnsPropsChildren>
    )
}

export default orderSummary;