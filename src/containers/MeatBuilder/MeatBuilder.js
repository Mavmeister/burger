import React, { Component } from 'react'
import ReturnsPropsChildren from '../../HOC/wrapper'
import ErrorHandler from '../../HOC/errorHandler'
import axios from 'axios'
import { connect } from 'react-redux'

import utilities from '../../utils/utils';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/OrderSummary/OrderSummary'

import Meat from '../../components/Burger/Meat'
import Controls from '../../components/Burger/Controls/Controls'
import Price from '../../components/Burger/Price/Price'
import * as actions from '../../actions/builder'

let INGREDIENT_PRICES = {}

const URL = 'https://burgerville-bc30a.firebaseio.com/'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 1,
        cheese: 0,
        pickle: 0
    },
    totalPrice: 0,
    totalIngredientCount: 0,
    tax: 0,
    date: null,
    isPurchasing: false,
    loading: false,
}

class MeatBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = initialState;

    componentDidMount (){
        // console.log('setting up...(gathering ingredient info)')
        // axios.get('https://burgerville-bc30a.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        // axios.get('https://burgerville-bc30a.firebaseio.com/ingredientPrices.json')
        //     .then(response => {
        //         INGREDIENT_PRICES = response.data
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    fakeLoadingTimer(){
        setTimeout(() => {
            this.setState({loading: false, isPurchasing: false})
        }, 2000)
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
            .then(this.fakeLoadingTimer())
            .catch(error => console.log("ERROR", error))
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
            ...this.props.ings
        }

        // sets {cheese: false, etc} if the value is below 1
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let orderSummary = null;

        let burger = <Spinner />
        
        if (this.props.ings){
            burger = (
                <ReturnsPropsChildren>
                <Meat ingredients={this.props.ings} />
                <Price 
                    price={this.state.totalPrice}
                    ingredientCount={this.state.totalIngredientCount} />
                <Controls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    isPurchasable={this.state.isPurchasable}
                    purchaseHandler={this.purchasingHandler}/>
                </ReturnsPropsChildren>)
                orderSummary = (
                    <OrderSummary 
                        ingredients={this.props.ings}
                        price={this.state.totalPrice}
                        ingredientCount={this.state.totalIngredientCount}
                        continueClicked={this.purchaseContinueHandler}
                        cancelClicked={this.purchaseCancelHandler}/>)
                }
                
        if (this.state.loading){orderSummary = <Spinner />}
        // Modal is now conditionally rendering, as is OrderSummary, 
        // because it is a child of Modal. lifecycyle hooks control this
        return (
        <ReturnsPropsChildren>
            <Modal 
                show={this.state.isPurchasing}
                modalClose={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </ReturnsPropsChildren>
        )
    }
}
const mapStateToProps = state => {
    console.log(state.ingredients)
    return {
        ings: state.ingredients.ingredients
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({
            type: actions.ADD_INGREDIENT,
            name: ingredientName
         }),
        onIngredientRemoved: (ingredientName) => dispatch({
            type: actions.REMOVE_INGREDIENT,
            name: ingredientName
         })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MeatBuilder, axios));