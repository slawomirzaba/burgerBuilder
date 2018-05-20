import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import lazyLoader from './hoc/lazyLoader';

import Layout from './containers/Layout/Layout';
import * as actions from './store/actions/index';
const BurgerBuilder = lazyLoader(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
});
const Checkout = lazyLoader(() => {
  return import('./containers/Checkout/Checkout');
});
const Orders = lazyLoader(() => {
  return import('./containers/Orders/Orders');
});
const Auth = lazyLoader(() => {
  return import('./containers/Auth/Auth');
});
const Logout = lazyLoader(() => {
  return import('./containers/Auth/Logout/Logout');
});


class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }

  render() {
    const authRoutes = (
      <Switch>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );
    const noAuthRoutes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );
    return (
      < Layout >
        {this.props.isAuthenticated ? authRoutes : noAuthRoutes}
      </Layout >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(actions.autoSignIn())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
