import React from 'react';
import propTypes from 'prop-types';
import classes from './NavigationItem.css';


class NavigationItem extends React.Component {
    render() {
        return (
            <li className={classes.NavigationItem}>
                <a href={this.props.link}
                    className={this.props.active ? classes.active : null}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}

NavigationItem.propTypes = {
    link: propTypes.string.isRequired,
    active: propTypes.bool
};

export default NavigationItem;