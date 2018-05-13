import React from 'react';
import _ from 'lodash';
import axios from '../../AxiosOrder';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withHandleError from '../../hoc/withHandleError';


class Orders extends React.Component {
    state = {
        orders: null
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(responseResult => {
                const orders = this.getOrders(responseResult);
                console.log(orders)
                this.setState({ orders: orders });
            })
    }

    getOrders = (response) => {
        return _.map(response.data, (value, key) => {
            const order = {
                ...value,
                id: key
            }

            return order;
        })
    }

    render() {
        if (!this.state.orders) return <Spinner />

        return this.state.orders.map((order) => {
            return (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            )
        });
    }
}

export default withHandleError(Orders, axios);