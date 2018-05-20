import React from 'react'
import propTypes from 'prop-types';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

class BuildControls extends React.Component {
    getControlsJsx = () => {
        return controls.map((control) => {
            return (
                <BuildControl
                    onAddIngredient={() => this.props.onAddIngredient(control.type)}
                    onRemoveIngredient={() => this.props.onRemoveIngredient(control.type)}
                    isDisabledLess={this.props.diabledLessButtonInfo[control.type]}
                    label={control.label}
                    key={control.label} />
            )
        });
    }

    render() {
        return (
            <div className={classes.BuildControls}>
                <p>Total price: <strong>{this.props.totalPrice.toFixed(2)}</strong>$</p>
                {this.getControlsJsx()}
                <button
                    className={classes.OrderButton}
                    disabled={!this.props.isPurchasable}
                    onClick={this.props.makePurchase}>
                    {this.props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN BEFORE'}
                </button>
            </div>
        )
    }
}

BuildControls.propTypes = {
    isPurchasable: propTypes.bool.isRequired,
    diabledLessButtonInfo: propTypes.object.isRequired,
    onRemoveIngredient: propTypes.func.isRequired,
    onAddIngredient: propTypes.func.isRequired,
    makePurchase: propTypes.func.isRequired,
    totalPrice: propTypes.number.isRequired
};

export default BuildControls;