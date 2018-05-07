import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    let classNames = [classes.Modal];
    props.show ? classNames.push(classes.showed) : classNames.push(classes.hidden);
    classNames = classNames.join(' ');

    return (
        <React.Fragment>
            <Backdrop
                show={props.show}
                clicked={props.onCloseModal} />
            <div className={classNames}>
                {props.children}
            </div>
        </React.Fragment>
    )
};

export default modal;