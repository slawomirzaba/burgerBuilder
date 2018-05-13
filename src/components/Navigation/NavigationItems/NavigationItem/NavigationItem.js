import React from 'react';
import propTypes from 'prop-types';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';


class NavigationItem extends React.Component {
    render() {
        return (
            <li className={classes.NavigationItem}>
                <NavLink to={this.props.link}
                    exact={this.props.exact}
                    activeClassName={classes.active}>
                    {this.props.children}
                </NavLink>
            </li>
        );
    }
}

NavigationItem.propTypes = {
    link: propTypes.string.isRequired,
    active: propTypes.bool
};

export default NavigationItem;