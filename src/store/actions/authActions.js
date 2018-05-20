import axios from 'axios';
import actionTypes from './actionTypes';

export const setRedirectPathFromAuth = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        payload: { path }
    }
}

export const logout = () => {
    localStorage.removeItem('localId');
    localStorage.removeItem('idToken')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.LOG_OUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const autoSignIn = () => {
    return (dispatch) => {
        const localId = localStorage.getItem('localId');
        const idToken = localStorage.getItem('idToken')
        const expirationDateString = localStorage.getItem('expirationDate');
        const expirationDate = new Date(expirationDateString);

        if (!localId || !idToken || !expirationDateString) return;
        if (expirationDate <= new Date()) {
            dispatch(logout);
            return;
        }

        const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000
        const responseData = {
            localId,
            idToken,
            expiresIn
        }
        dispatch(authSuccess(responseData));
        dispatch(checkAuthTimeout(expiresIn));
    }
}

const authSuccess = (responseData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            localId: responseData.localId,
            idToken: responseData.idToken,
            expiresIn: responseData.expiresIn
        }
    };
}

const authFail = (errorData) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error: errorData
        }
    };
}

export const authentication = (email, password, isSignUp) => {
    const SIGN_UP_LINK = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-R69cDxvc6UMd1NPtnkuQ4zVFJZ6mmOU';
    const SIGN_IN_LINK = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC-R69cDxvc6UMd1NPtnkuQ4zVFJZ6mmOU';

    return (dispatch) => {
        dispatch(authStart())
        const link = isSignUp ? SIGN_UP_LINK : SIGN_IN_LINK;
        const userData = {
            email,
            password,
            returnSecureToken: true
        }
        axios.post(link, userData)
            .then((response) => {
                const expirationDate = new Date((new Date()).getTime() + parseInt(response.data.expiresIn, 10) * 1000);
                localStorage.setItem('localId', response.data.localId)
                localStorage.setItem('idToken', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(response.data))
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error))
            });
    }
}