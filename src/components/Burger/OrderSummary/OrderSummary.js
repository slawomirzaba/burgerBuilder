import React from 'react';

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
            <p>Continue to Checkout?</p>
        </React.Fragment>
    )
};

export default orderSummary;