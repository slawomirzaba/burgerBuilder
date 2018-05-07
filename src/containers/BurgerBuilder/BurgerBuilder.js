import React from 'react';
import _ from 'lodash';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.8,
    cheese: 0.5,
    meat: 1.5
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        isPurchasable: false,
        isPurchasing: false
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

    turnOnPurchaseMode = () => {
        this.setState({ isPurchasing: true });
    }

    turnOffPurchaseMode = () => {
        this.setState({ isPurchasing: false });
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.state.isPurchasing}
                    onCloseModal={this.turnOffPurchaseMode}>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAddIngredient={this.addIngredientHandler}
                    onRemoveIngredient={this.removeIngredientHandler}
                    diabledLessButtonInfo={this.getDisabledInfo()}
                    isPurchasable={this.state.isPurchasable}
                    totalPrice={this.state.totalPrice}
                    makePurchase={this.turnOnPurchaseMode} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder