import actionTypes from './actionTypes';
import axios from '../../AxiosOrder';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName }
    };
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName }
    };
}

const setIngredientsFromServer = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS_FROM_SERVER,
        payload: { ingredients }
    }
}

const setServerError = ()=> {
    return {
        type: actionTypes.SET_SERVER_ERROR
    }
}

export const fetchIngredients = () => {
    return (dispatch) => {
        axios.get('/ingredients.json')
            .then((response) => {
                dispatch(setIngredientsFromServer(response.data))
            })
            .catch(() => {
                dispatch(setServerError())
            });
    }
}