import reducer from './authReducer';
import actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
    it('should init with correct state', () => {
        const state = reducer(undefined, {});

        expect(state).toEqual({
            localId: null,
            idToken: null,
            expiresIn: null,
            error: null,
            isLoading: false,
            redirectPath: '/'
        });
    });

    it('shuld isLoading be true when authentication started', () => {
        const state = reducer(undefined, { type: actionTypes.AUTH_START });

        expect(state.isLoading).toBeTruthy();
    });

    it('shuld set correct state when auth succeded', () => {
        const state = reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS, payload: {
                localId: 'local-id',
                idToken: 'id-token',
                expiresIn: 'expires-in'
            }
        });

        expect(state).toEqual({
            isLoading: false,
            localId: 'local-id',
            idToken: 'id-token',
            expiresIn: 'expires-in',
            error: null,
            redirectPath: '/'
        });
    });

    it('shuld set correct state when auth failed', () => {
        const state = reducer(undefined, {
            type: actionTypes.AUTH_FAIL, payload: {
                error: 'error'
            }
        });

        expect(state).toEqual({
            isLoading: false,
            localId: null,
            idToken: null,
            expiresIn: null,
            error: 'error',
            redirectPath: '/'
        });
    });

    it('should set correct state after logout', () => {
        const state = reducer(undefined, { type: actionTypes.LOG_OUT });

        expect(state).toEqual({
            localId: null,
            idToken: null,
            expiresIn: null,
            error: null,
            isLoading: false,
            redirectPath: '/'
        });
    });

    it('should set correct path after SET_REDIRECT_PATH', () => {
        const state = reducer(undefined, { type: actionTypes.SET_REDIRECT_PATH, payload: { path: 'path' } });

        expect(state.redirectPath).toBe('path');
    });
});