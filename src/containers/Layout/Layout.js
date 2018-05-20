import React from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sitedrawer from '../../components/Navigation/Sitedrawer/Sitedrawer';

class Layout extends React.Component {
    state = {
        siteDrawerShowed: false
    };

    closeSiteDrawer = () => {
        this.setState({ siteDrawerShowed: false });
    }

    toggleSiteDrawer = () => {
        this.setState((prevState) => {
            return {
                siteDrawerShowed: !prevState.siteDrawerShowed
            };
        });
    }

    render() {
        return (<React.Fragment>
            <Toolbar
                toggleSiteDrawer={this.toggleSiteDrawer}
                isAuthenticated={this.props.isAuthenticated} />
            <Sitedrawer
                isAuthenticated={this.props.isAuthenticated}
                isOpen={this.state.siteDrawerShowed}
                close={this.closeSiteDrawer} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}


export default connect(mapStateToProps)(Layout);