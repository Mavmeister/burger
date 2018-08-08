import createReducer from './createReducer';

import {
    ADD_INGREDIENT, 
    UPDATE_INGREDIENTS, 
    REMOVE_INGREDIENT
} from '../actions/builder';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        pickles: 0
    },
    totalPrice: 0
}

const handlers = {
    [ADD_INGREDIENT]: (state, payload ) => ({
        ...state,
        ingredients: {
            ...state.ingredients,
            [payload.name]: state.ingredients[payload.name] + 1
        }
    }),
    // [UPDATE_INGREDIENTS]: (state, { payload }) => ({
    //     ...state,
    //     loading: true,
    //     request: payload
    // }),
    [REMOVE_INGREDIENT]: (state, payload ) => ({
        ...state,
        loading: true,
        ingredients: {
            ...state.ingredients,
            [payload.name]: state.ingredients[payload.name] - 1
        }
    }),

}

export default createReducer(handlers, initialState);
