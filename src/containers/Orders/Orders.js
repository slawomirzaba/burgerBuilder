import React from 'react';
import { connect } from 'react-redux';

import axios from '../../AxiosOrder';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withHandleError from '../../hoc/withHandleError';
import * as actions from '../../store/actions/index';


class Orders extends React.Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        if (this.props.isLoading) return <Spinner />
        if (!this.props.orders) return <p>Fetch orders failed!</p>

        return this.props.orders.map((order) => {
            return (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            )
        });
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withHandleError(Orders, axios));