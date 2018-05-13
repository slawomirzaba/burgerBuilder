import React from 'react';
import _ from 'lodash';
import classes from './Order.css'

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: {getIngredients()}</p>
            <p>price: <strong>{props.price}$</strong></p>
        </div>
    )

    function getIngredients() {
        const ingredients = _.map(props.ingredients, (value, ingredientName) => {
            if (value === 0) return null;
            return (
                <span key={ingredientName}>
                    {ingredientName} ({value})
                </span>
            );
        })

        return _.compact(ingredients);
    }
}

export default order;