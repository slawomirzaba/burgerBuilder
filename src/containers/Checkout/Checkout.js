import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    checkoutCancelled = () => {
        this.props.history.push('/');
    }

    checkoutContinued = () => {
        this.props.history.push(`${this.props.match.path}/contact-data`);
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}>
                </CheckoutSummary>
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);