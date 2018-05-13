import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    getClassNames = () => {
        const classNames = [classes.Modal];
        this.props.show ? classNames.push(classes.showed) : classNames.push(classes.hidden);
        return classNames.join(' ');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.onCloseModal} />
                <div className={this.getClassNames()}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
};

export default Modal;