import React from 'react';
import _ from 'lodash'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    const WARNING_MESSAGE = (<p>Please start adding ingredients!</p>);
    const ingredients = getIngredientsJsx(props.ingredients);


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients.length ? ingredients : WARNING_MESSAGE}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

    function getIngredientsJsx(ingredientsObj) {
        return _.reduce(ingredientsObj, (ingredientsArr, ingredientCount, ingredientName, index) => {
            _.range(ingredientCount).forEach((el, index) => {
                ingredientsArr.push((
                    <BurgerIngredient
                        type={ingredientName}
                        key={ingredientName + index} />
                ))
            })
            return ingredientsArr;
        }, [])
    }
}

export default burger;