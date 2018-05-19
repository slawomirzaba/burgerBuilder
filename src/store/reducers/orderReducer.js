import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    isLoading: false,
    ordered: false,
    orders: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PURCHASE:
            return updateObject(state, { ordered: false });
        case actionTypes.START_PURCHASING_BURGER:
            return updateObject(state, { isLoading: true, ordered: false });
        case actionTypes.SUCCESS_PURCHASING_BURGER:
            return updateObject(state, { isLoading: false, ordered: true });
        case actionTypes.FAIL_PURCHASING_BURGER:
            return updateObject(state, { isLoading: false, ordered: false });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { isLoading: true });
        case actionTypes.SET_ORDERS:
            return updateObject(state, { orders: action.payload.orders, isLoading: false });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, { isLoading: false });
        default:
            return state;
    }
}

export default reducer;