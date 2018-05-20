import actionsTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    localId: null,
    idToken: null,
    expiresIn: null,
    error: null,
    isLoading: false,
    redirectPath: '/'
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        localId: action.payload.localId,
        idToken: action.payload.idToken,
        expiresIn: action.payload.expiresIn,
        error: null
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        localId: null,
        idToken: null,
        expiresIn: null,
        error: action.payload.error
    });
}

const logout = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        localId: null,
        idToken: null,
        expiresIn: null,
        error: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.AUTH_START:
            return updateObject(state, { isLoading: true });
        case actionsTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionsTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionsTypes.LOG_OUT:
            return logout(state, action);
        case actionsTypes.SET_REDIRECT_PATH:
            return updateObject(state, { redirectPath: action.payload.path });
        default:
            return state;
    }
}

export default reducer;