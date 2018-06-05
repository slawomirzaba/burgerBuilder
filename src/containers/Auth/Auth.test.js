import React from 'react';
import { Redirect } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { Auth } from './Auth';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });


describe('<Auth/>', () => {
    let suite;
    beforeEach(() => {
        suite = {};
        suite.wrapper = shallow(<Auth redirectPath='/' />);
    });

    afterEach(() => {
        suite = null;
    });

    it('should return redirect if user is Authenticated', () => {
        suite.wrapper.setProps({
            isAuthenticated: true
        });

        expect(suite.wrapper.find(Redirect)).toHaveLength(1);
        expect(suite.wrapper.contains(<Redirect to='/'></Redirect>)).toBeTruthy();
    });

    it('should contains spinner if auth during', () => {
        suite.wrapper.setProps({
            isAuthenticated: false,
            isLoading: true
        });

        expect(suite.wrapper.contains(<Spinner></Spinner>)).toBeTruthy();
    });

    it('should contains errorMessage if error occured', () => {
        suite.wrapper.setProps({
            isAuthenticated: false,
            error: { message: 'EMAIL_EXISTS' }
        });

        expect(suite.wrapper.contains(<h4>The email address is already in use by another account.</h4>)).toBeTruthy();
    });

    it('should send signUp with values from form', () => {
        suite.wrapper = mount(<Auth redirectPath='/' />);
        const state = getSimplyState();
        const authenticationHandler = jest.fn();
        state.form.email.value = 'test@test.pl';
        state.form.password.value = 'testtest';
        suite.wrapper.setProps({
            isAuthenticated: false,
            authenticationHandler: authenticationHandler
        });
        suite.wrapper.setState({
            form: state.form,
        });

        suite.wrapper.find('#submitButton').simulate('submit');
        expect(authenticationHandler).toBeCalledWith('test@test.pl', 'testtest', true)
    })

    function getSimplyState() {
        return {
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
    }
});