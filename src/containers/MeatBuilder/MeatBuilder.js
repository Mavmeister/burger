import React, { Component } from 'react'
import ReturnsPropsChildren from '../../HOC/wrapper'
import axios from 'axios'

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner'
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

const URL = 'https://burgerville-bc30a.firebaseio.com/'

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
    isPurchasing: false,
    loading: false
}

class MeatBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = initialState;

    componentDidMount (){
        console.log('setting up...')
        // this.setState({loading: false, isPurchasing: false})
    }

    timer(type){
        setTimeout(() => {
            console.log("IM DONE!");
            this.setState({loading: false, isPurchasing: false})
        }, 1800)
    }

    purchasingHandler = () => {
        this.setState({
            isPurchasing: true
        })
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            orderNumber: Math.floor(Math.random()* 1000) + 1,
            ingredients: this.state.ingredients,
            // use server side prices for security in future
            price: this.state.totalPrice,
            totalIngredientCount: this.state.totalIngredientCount,
            customer: {
                firstName: 'John',
                lastName: 'Smith',
                address: {
                    street: '523 Adams Ct',
                    zip: '33322',
                    country: 'USA'
                },
                email: 'jeff@bridges.com',
                date: new Date()
            },
            options: {
                delivery: 'fast',
                driver: 'Sam',
                complete: false
            }
        }
        console.log('Purchased!', order)
        axios.post(`${URL}/orders.json`, order)
            .then(response => console.log("RES", response))
            .then(this.timer())
            .catch(error => console.log(error))
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

        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        ingredientCount={this.state.totalIngredientCount}
        continueClicked={this.purchaseContinueHandler}
        cancelClicked={this.purchaseCancelHandler}/>

        if (this.state.loading){orderSummary = <Spinner />}
        
        // Modal is now conditionally rendering, as is OrderSummary, 
        // because it is a child of Modal. lifecycyle hooks control this
        return (
        <ReturnsPropsChildren >
            <Modal 
                show={this.state.isPurchasing}
                modalClose={this.purchaseCancelHandler}>
                {orderSummary}
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