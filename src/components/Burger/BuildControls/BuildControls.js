import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Meat', type: 'meat' }
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong>$</p>
            {getControlsJsx()}
            <button
                className={classes.OrderButton}
                disabled={!props.isPurchasable}
                onClick={props.makePurchase}>
                ORDER NOW
            </button>
        </div>
    )

    function getControlsJsx() {
        return controls.map((control) => {
            return (
                <BuildControl
                    onAddIngredient={() => props.onAddIngredient(control.type)}
                    onRemoveIngredient={() => props.onRemoveIngredient(control.type)}
                    isDisabledLess={props.diabledLessButtonInfo[control.type]}
                    label={control.label}
                    key={control.label} />
            )
        })
    }

}

export default buildControls;