import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.8,
    cheese: 0.5,
    meat: 1.5
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    serverError: false
};

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
    });
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload.ingredientName]
    });
}

const removeIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
    });
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload.ingredientName]
    });
}

const setIngredientsFromServer = (state, action) => {
    return updateObject(state, {
        ingredients: action.payload.ingredients,
        serverError: false,
        totalPrice: 4
    })
}

const setServerError = (state, action) => {
    return updateObject(state, {
        serverError: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS_FROM_SERVER:
            return setIngredientsFromServer(state, action);
        case actionTypes.SET_SERVER_ERROR:
            return setServerError(state, action);
        default:
            return state;
    }
}

export default reducer;