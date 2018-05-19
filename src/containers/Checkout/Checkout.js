import React from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        if (!this.props.ingredients || this.props.ordered) return <Redirect to='/'></Redirect>;

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
        ingredients: state.burger.ingredients,
        ordered: state.order.ordered
    };
}

export default connect(mapStateToProps)(Checkout);