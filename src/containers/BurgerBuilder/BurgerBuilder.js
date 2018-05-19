import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../AxiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withHandleError from '../../hoc/withHandleError';
import actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends React.Component {
    state = {
        isPurchasing: false,
        isLoadingOrder: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then((response) => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    isPurchasable = () => {
        const productsCount = Object.values(this.props.ingredients)
            .reduce((sum, num) => sum + num, 0);

        return productsCount > 0;
    }

    getDisabledInfo = () => {
        return _(this.props.ingredients)
            .mapValues((value) => {
                return value <= 0;
            })
            .value();
    }

    purchaseStartHandler = () => {
        this.setState({ isPurchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    getOrderSummary = () => {
        return <OrderSummary
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            onCancel={this.purchaseCancelHandler}
            onSubmit={this.purchaseContinueHandler} />
    }

    render() {
        if (this.state.error) return <p> Ingredients cannot be loaded!</p>;
        if (!this.props.ingredients) return <Spinner></Spinner>;
        return (
            <React.Fragment>
                <Modal
                    show={this.state.isPurchasing}
                    onCloseModal={this.purchaseCancelHandler}>
                    {this.state.isLoadingOrder ? <Spinner /> : this.getOrderSummary()}
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    onAddIngredient={this.props.addIngredientHandler}
                    onRemoveIngredient={this.props.removeIngredientHandler}
                    diabledLessButtonInfo={this.getDisabledInfo()}
                    isPurchasable={this.isPurchasable()}
                    totalPrice={this.props.totalPrice}
                    makePurchase={this.purchaseStartHandler} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredientName } }),
        removeIngredientHandler: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientName } })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withHandleError(BurgerBuilder, axios));