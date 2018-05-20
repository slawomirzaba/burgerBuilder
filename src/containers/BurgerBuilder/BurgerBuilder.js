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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends React.Component {
    state = {
        isPurchasing: false
    }

    componentDidMount() {
        this.props.fetchIngredientsHandler();
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
        if (this.props.isAuthenticated) {
            this.props.setRedirectPathFromAuth('/');
            this.setState({ isPurchasing: true });
        }
        else {
            this.props.setRedirectPathFromAuth('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.initPurchase();
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
        if (this.props.serverError) return <p> Ingredients cannot be loaded!</p>;
        if (!this.props.ingredients) return <Spinner></Spinner>;
        return (
            <React.Fragment>
                <Modal
                    show={this.state.isPurchasing}
                    onCloseModal={this.purchaseCancelHandler}>
                    {this.getOrderSummary()}
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    onAddIngredient={this.props.addIngredientHandler}
                    onRemoveIngredient={this.props.removeIngredientHandler}
                    diabledLessButtonInfo={this.getDisabledInfo()}
                    isPurchasable={this.isPurchasable()}
                    isAuthenticated={this.props.isAuthenticated}
                    totalPrice={this.props.totalPrice}
                    makePurchase={this.purchaseStartHandler} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        serverError: state.burger.serverError,
        isAuthenticated: state.auth.idToken !== null
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        fetchIngredientsHandler: () => dispatch(actions.fetchIngredients()),
        initPurchase: () => dispatch(actions.initPurchase()),
        setRedirectPathFromAuth: (path) => dispatch(actions.setRedirectPathFromAuth(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withHandleError(BurgerBuilder, axios));