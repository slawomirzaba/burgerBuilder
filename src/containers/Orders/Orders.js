import React from 'react';
import { connect } from 'react-redux';

import axios from '../../AxiosOrder';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withHandleError from '../../hoc/withHandleError';
import * as actions from '../../store/actions/index';


class Orders extends React.Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.idToken, this.props.localId);
    }

    render() {
        if (this.props.isLoading) return <Spinner />
        if (!this.props.orders) return <p>Fetch orders failed!</p>
        if (!this.props.orders.length) return <p>NO ORDERS</p>

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
        isLoading: state.order.isLoading,
        idToken: state.auth.idToken,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, localId) => dispatch( actions.fetchOrders(token, localId) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withHandleError(Orders, axios));