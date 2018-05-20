import React from 'react';

const lazyLoader = (importFunction) => {
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() {
            importFunction()
                .then((cmp) => {
                    this.setState({ component: cmp.default });
                });
        }


        render() {
            const Component = this.state.component;

            return Component ? <Component {...this.props} /> : null;
        }
    }
}

export default lazyLoader;