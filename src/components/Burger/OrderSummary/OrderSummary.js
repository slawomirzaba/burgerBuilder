import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientNameStyle = { textTransform: 'capitalize' };
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((ingredientName) => {
            return (
                <li key={ingredientName}>
                    <span style={ingredientNameStyle}>{ingredientName}: </span>
                    {props.ingredients[ingredientName]}
                </li>
            );
        })

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            {ingredientsSummary}
            <p>Total price: <strong>{props.price.toFixed(2)}</strong>$</p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.onCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.onSubmit}>CONTINUE</Button>
        </React.Fragment>
    )
};

export default orderSummary;