import React from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../AxiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withHandleError from '../../hoc/withHandleError';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.8,
    cheese: 0.5,
    meat: 1.5
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        isPurchasable: false,
        isPurchasing: false,
        isLoadingOrder: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState = () => {
        const copyIngredients = { ...this.state.ingredients };
        const productsCount = Object.values(copyIngredients)
            .reduce((sum, num) => sum + num, 0);

        this.setState({
            isPurchasable: productsCount > 0
        });
    }

    addIngredientHandler = (ingredientType) => {
        this.setState((prevState) => {
            const copyState = { ...prevState };
            copyState.ingredients[ingredientType] += 1;
            copyState.totalPrice += INGREDIENTS_PRICE[ingredientType];

            return {
                ingredients: copyState.ingredients,
                totalPrice: copyState.totalPrice
            };
        }, this.updatePurchaseState);
    }

    removeIngredientHandler = (ingredientType) => {
        if (this.state.ingredients[ingredientType] <= 0) return;

        this.setState((prevState) => {
            const copyState = { ...prevState };
            copyState.ingredients[ingredientType] -= 1;
            copyState.totalPrice -= INGREDIENTS_PRICE[ingredientType];

            return {
                ingredients: copyState.ingredients,
                totalPrice: copyState.totalPrice
            };
        }, this.updatePurchaseState);
    }

    getDisabledInfo = () => {
        return _({ ...this.state.ingredients })
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
        const query = queryString.stringify({
            ...this.state.ingredients,
            price: this.state.totalPrice
        });
        this.props.history.push({
            pathname: '/checkout',
            search: `?${query}`
        });
    }

    getOrderSummary = () => {
        return <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            onCancel={this.purchaseCancelHandler}
            onSubmit={this.purchaseContinueHandler} />
    }

    render() {
        if (this.state.error) return <p> Ingredient cannot be loaded!</p>
        if (!this.state.ingredients) return <Spinner></Spinner>
        return (
            <React.Fragment>
                <Modal
                    show={this.state.isPurchasing}
                    onCloseModal={this.purchaseCancelHandler}>
                    {this.state.isLoadingOrder ? <Spinner /> : this.getOrderSummary()}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAddIngredient={this.addIngredientHandler}
                    onRemoveIngredient={this.removeIngredientHandler}
                    diabledLessButtonInfo={this.getDisabledInfo()}
                    isPurchasable={this.state.isPurchasable}
                    totalPrice={this.state.totalPrice}
                    makePurchase={this.purchaseStartHandler} />
            </React.Fragment>
        )
    }
}

export default withHandleError(BurgerBuilder, axios);