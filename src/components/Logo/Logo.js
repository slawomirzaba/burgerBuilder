import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => {
    return (
        <div className={classes.BurgerLogo}>
            <img src={burgerLogo} alt="myBurger"/>
        </div>
    )
}

export default logo;