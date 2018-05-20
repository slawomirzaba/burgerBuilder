import React from 'react';
import classes from './Sitedrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sitedrawer = (props) => {
    let classNames = props.isOpen ? [classes.Open] : [classes.Close];
    classNames.push(classes.Sitedrawer);
    classNames = classNames.join(' ');

    return (
        <React.Fragment>
            <Backdrop show={props.isOpen} clicked={props.close}></Backdrop>
            <div className={classNames} onClick={props.close}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sitedrawer;