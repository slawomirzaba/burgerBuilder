import React from 'react';
import Modal from '../components/UI/Modal/Modal';

const withHandleError = (WrappedComponent, axiosInstance) => {
    return class extends React.Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axiosInstance.interceptors.request.use((config) => {
                this.setState({ error: null });
                return config;
            }, (error) => {
                this.setState({ error: error });
                return Promise.reject(error);
            });

            this.resInterceptor = axiosInstance.interceptors.response.use((config) => {
                this.setState({ error: null });
                return config;
            }, (error) => {
                this.setState({ error: error });
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
            axiosInstance.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirm = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} onCloseModal={this.errorConfirm}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </React.Fragment>
            )
        }
    }
}

export default withHandleError;