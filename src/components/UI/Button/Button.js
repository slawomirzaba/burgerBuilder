import React from 'react';
import classes from './Button.css';

const button = (props) => {
    const getProperClassesForButton = () => {
        const primary_class = classes.Button;
        return [primary_class, classes[props.btnType]].join(' ');
    }

    return (
        <button onClick={props.clicked} className={getProperClassesForButton()}>
            {props.children}
        </button>
    );
}

export default button;