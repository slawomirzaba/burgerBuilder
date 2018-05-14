import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let errorMessage = null;
    const classNames = [classes.InputElement];
    if (!props.isValid && props.isTouched) {
        errorMessage = <p1>Please provide a valid value!</p1>
        classNames.push(classes.Invalid)
    }

        switch (props.inputType) {
            case 'input':
            default:
                inputElement = <input
                    onChange={props.changed}
                    value={props.value}
                    className={classNames.join(' ')}
                    {...props.elementConfig} />;
                break;
            case 'select':
                inputElement = (
                    <select
                        className={classNames.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {
                            props.elementConfig.options.map((option) => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}>
                                        {option.display
                                        }</option>
                                );
                            })
                        }
                    </select>
                );
                break;
        }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );
}

export default input;