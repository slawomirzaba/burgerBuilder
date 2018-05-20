import _ from 'lodash';

import actionTypes from './actionTypes';
import axios from '../../AxiosOrder';

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    };
}

const startPurchasingBurger = () => {
    return {
        type: actionTypes.START_PURCHASING_BURGER
    };
}

const successPurchasingBurger = () => {
    return {
        type: actionTypes.SUCCESS_PURCHASING_BURGER
    };
}

const failPurchasingBurger = () => {
    return {
        type: actionTypes.FAIL_PURCHASING_BURGER
    };
}


export const checkoutOrder = (order, token) => {

    return (dispatch) => {
        dispatch(startPurchasingBurger());

        axios.post(`/orders.json?auth=${token}`, order)
            .then((responseData) => {
                dispatch(successPurchasingBurger());
            })
            .catch((error) => {
                dispatch(failPurchasingBurger());
            });
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

const setOrders = (orders) => {
    return {
        type: actionTypes.SET_ORDERS,
        payload: {orders: orders}
    }
}

export const fetchOrders = (token, localId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());

        axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${localId}"`)
            .then(responseResult => {
                const orders = getOrders(responseResult);
                dispatch(setOrders(orders));
            })
            .catch(() => {
                dispatch(fetchOrdersFail());
            })
    }

    function getOrders(response) {
        return _.map(response.data, (value, key) => {
            const order = {
                ...value,
                id: key
            }

            return order;
        })
    }
}