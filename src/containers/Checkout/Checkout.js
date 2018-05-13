import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import queryString from 'query-string';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: null
    }

    componentWillMount() {
        const passedParams = queryString.parse(this.props.location.search);
        const passedIngredients = _.reduce(passedParams, (acc, value, key) => {
            if (key === 'price') return acc;
            acc[key] = parseInt(value, 10);
            return acc;
        }, {})
        this.setState({ ingredients: passedIngredients, price: passedParams.price });
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}>
                </CheckoutSummary>
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={(props) => {
                        return <ContactData
                            {...props}
                            ingredients={this.state.ingredients}
                            price={this.state.price} />
                    }} />
            </div>
        );
    }
}

export default Checkout;