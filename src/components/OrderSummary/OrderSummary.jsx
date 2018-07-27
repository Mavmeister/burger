import React, {Component} from 'react';

import ReturnsPropsChildren from '../../HOC/wrapper'

import Price from '../Burger/Price/Price'
import Button from '../UI/Button/Button'


// this could be functional component instead of class
class orderSummary extends Component {
    
    componentWillUpdate(){
        console.log('Order Summary will update')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(key => {
                return <li key={key}>
                        <span style={{textTransform: 'capitalize'}}>{key}:  </span> 
                        {this.props.ingredients[key]}
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
                <Button buttonType="Danger" clicked={this.props.cancelClicked}> Cancel </Button>
                <Button buttonType="Success" clicked={this.props.continueClicked}> Continue </Button>
                <Price price={this.props.price} ingredientCount={this.props.ingredientCount}/>
            </ReturnsPropsChildren>
        )
    }




}

export default orderSummary;