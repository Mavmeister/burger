import React, { Component } from 'react'
import ReturnsPropsChildren from '../../HOC/wrapper'

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary'

import Meat from '../../components/Burger/Meat'
import Controls from '../../components/Burger/Controls/Controls'
import Price from '../../components/Burger/Price/Price'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 0.72,
    pickles: 2.54
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        pickles: 0,
        bacon: 0
    },
    totalPrice: 0,
    totalIngredientCount: 0,
    tax: 0,
    date: null,
    isPurchasable: false,
    isPurchasing: false
}

class MeatBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = initialState;

    componentDidMount (){
    }

    purchasingHandler = () => {
        this.setState({
            isPurchasing: true
        })
    }

    purchaseContinueHandler = () => {
        console.log('Purchased!')
        this.setState(initialState)
    }

    purchaseCancelHandler = () => {
        this.setState({
            isPurchasing: false
        })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            })
            .reduce((sum, element) => {
                console.log(sum + element)
                return sum + element;
            }, 0)
        this.setState({
            totalIngredientCount: sum,
            isPurchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        console.log('adding', type)
        // TODO: shrink this code
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients,
        }
        updatedIngredients[type] = updatedCount;

        const priceAdd = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        console.log('removing', type)
        // TODO: shrink this code
        const oldCount = this.state.ingredients[type]

        // dont allow removal
        if (oldCount <= 0) { return }

        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients,
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        // sets {cheese: false, etc} if the value is below 1
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] < 1;
        }
        
        // Modal is now conditionally rendering, as is OrderSummary, 
        // because it is a child of Modal. lifecycyle hooks control this
        return (
        <ReturnsPropsChildren >

            <Modal 
                show={this.state.isPurchasing}
                modalClose={this.purchaseCancelHandler}>
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    ingredientCount={this.state.totalIngredientCount}
                    continueClicked={this.purchaseContinueHandler}
                    cancelClicked={this.purchaseCancelHandler}
                 />
            </Modal>
            <Meat ingredients={this.state.ingredients} />
            <Price 
                price={this.state.totalPrice}
                ingredientCount={this.state.totalIngredientCount} />
            <Controls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                isPurchasable={this.state.isPurchasable}
                purchaseHandler={this.purchasingHandler}
            />
        </ReturnsPropsChildren >
        )
    }
}

export default MeatBuilder;