import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            {!props.isAuthenticated ? <NavigationItem link="/auth">Authentication</NavigationItem> : null }
            {props.isAuthenticated ? <NavigationItem link="/Logout">Logout</NavigationItem> : null}
        </ul>
    )
}

export default navigationItems;