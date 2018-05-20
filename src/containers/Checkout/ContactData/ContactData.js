import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../AxiosOrder';
import withHandleError from '../../../hoc/withHandleError';
import * as actions from '../../../store/actions/index';

class ContactData extends React.Component {
    state = {
        form: {
            name: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name',
                    autoComplete: 'off'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                inputType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your E-mail',
                    autoComplete: 'off'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'street',
                    placeholder: 'Your Street',
                    autoComplete: 'off'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'postalCode',
                    placeholder: 'Your Postal Code',
                    autoComplete: 'off'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                inputType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        display: 'Fastest'
                    }, {
                        value: 'chipest',
                        display: 'Chipest'
                    }]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formValid: false
    }

    checkoutHandler = (event) => {
        event.preventDefault();

        const customerData = _.reduce(this.state.form, (acc, properies, inputId) => {
            acc[inputId] = properies.value;
            return acc;
        }, {});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: customerData,
            userId: this.props.localId
        }
        this.props.checkoutOrderHandler(order, this.props.idToken);
    }

    checkInputValid = (value, rules) => {
        let isValid = true;

        if (rules.required)
            isValid = isValid && value.trim() !== '';

        if (rules.minLength)
            isValid = isValid && value.length >= rules.minLength;

        if (rules.maxLength)
            isValid = isValid && value.length <= rules.minLength;

        if (rules.isNumeric) {
            const numericPattern = /^\d+$/;
            isValid = numericPattern.test(value) && isValid;
        }

        if (rules.isEmail) {
            const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = emailPattern.test(value) && isValid;
        }

        return isValid;
    }

    checkFormValid = (updatedForm) => {
        let isValid = true;

        for (let inputIdentifier in updatedForm) {
            isValid = isValid && updatedForm[inputIdentifier].valid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputId) => {
        const updatedForm = _.cloneDeep(this.state.form);
        const changedInput = updatedForm[inputId];
        changedInput.value = event.target.value;
        changedInput.valid = this.checkInputValid(changedInput.value, changedInput.validation);
        changedInput.touched = true;
        const isFormValid = this.checkFormValid(updatedForm);

        this.setState({ form: updatedForm, formValid: isFormValid });
    }

    getInputs() {
        return _.map(this.state.form, (inputConf, inputId) => {
            return <Input
                key={inputId}
                value={inputConf.value}
                isValid={inputConf.valid}
                isTouched={inputConf.touched}
                elementConfig={inputConf.elementConfig}
                inputType={inputConf.inputType}
                changed={(event) => this.inputChangeHandler(event, inputId)} />
        });
    }

    render() {
        let content = null;
        if (this.props.isLoading) content = <Spinner />;
        else
            content = (
                <form onSubmit={this.checkoutHandler}>
                    {this.getInputs()}
                    <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
                </form>
            )

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        isLoading: state.order.isLoading,
        idToken: state.auth.idToken,
        localId: state.auth.localId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkoutOrderHandler: (order, token) => dispatch(actions.checkoutOrder(order, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withHandleError(ContactData, axios));