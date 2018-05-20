import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index';
import errorsMapping from './errorsMapping';

class Auth extends Component {
    state = {
        form: {
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
            password: {
                inputType: 'input',
                elementConfig: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Your Password',
                    autoComplete: 'off'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formValid: false,
        isSignUp: true
    }

    componentDidMount() {
        if (this.props.redirectPath !== '/') {
            const productsCount = Object.values(this.props.ingredients)
                .reduce((sum, num) => sum + num, 0);

            if (productsCount === 0)
                this.props.onSetAuthRedirectPath();
        }
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
        const updatedForm = {
            ...this.state.form,
            [inputId]: {
                ...this.state.form[inputId],
                value: event.target.value,
                valid: this.checkInputValid(event.target.value, this.state.form[inputId].validation),
                touched: true
            }
        };
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

    authHandler = (event) => {
        event.preventDefault();

        this.props.authenticationHandler(
            this.state.form.email.value,
            this.state.form.password.value,
            this.state.isSignUp
        );
    }

    changeAuthMethod = () => {
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp
            };
        })
    }

    getFormView = () => {
        return (
            <React.Fragment>
                <form onSubmit={this.authHandler}>
                    {this.getInputs()}
                    <Button btnType="Success" disabled={!this.state.formValid}>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.changeAuthMethod}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </React.Fragment>
        );
    }

    render() {
        if (this.props.isAuthenticated) return <Redirect to={this.props.redirectPath}></Redirect>;

        return (
            <div className={classes.Auth}>
                <h4>{this.props.error ? errorsMapping[this.props.error.message] : null}</h4>
                {this.props.isLoading ? <Spinner /> : this.getFormView()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        redirectPath: state.auth.redirectPath,
        ingredients: state.burger.ingredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticationHandler: (email, password, isSignUp) => dispatch(actions.authentication(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setRedirectPathFromAuth('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);