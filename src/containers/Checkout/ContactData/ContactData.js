import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../AxiosOrder';
import withHandleError from '../../../hoc/withHandleError';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        isLoadingOrder: false
    }

    checkoutHandler = (event) => {
        event.preventDefault();

        this.setState({ isLoadingOrder: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Slawek',
                email: 'slawekzaba@poczta.fm'
            }
        }

        axios.post('/orders.json', order)
            .then((responseData) => {
                this.setState({ isLoadingOrder: false });
                this.props.history.replace('/');
            })
            .catch((error) => {
                this.setState({ isLoadingOrder: false });
            });
    }

    render() {
        let content = null;
        if (this.state.isLoadingOrder) content = <Spinner />;
        else
            content = <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.checkoutHandler}>ORDER</Button>
            </form>

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {content}
            </div>
        );
    }
}

export default withHandleError(ContactData, axios);