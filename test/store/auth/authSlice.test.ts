import { authSlice } from "../../../src/store/auth/authSlice";
import { checkingState, authenticatedState,notAuthenticatedState } from "../../fixtures/authFixtures";
describe('Test in auth slice', () => { 
    test('should return the initial state and named "auth"', () => { 
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(checkingState, { type: 'any' });
        expect(state).toEqual(checkingState);
    })
     test('should return that the user is authenticated', () => { 
        const state = authSlice.reducer(checkingState, authSlice.actions.login(authenticatedState));
        expect(state).toEqual(authenticatedState);
    })
    test('should made the logout without arguments', () => { 
        const state = authSlice.reducer(authenticatedState, authSlice.actions.logout({errorMessage:null}));
        expect(state).toEqual({...notAuthenticatedState, errorMessage: null});
     })
    test('should made the logout and return message error', () => { 
        const state = authSlice.reducer(authenticatedState, authSlice.actions.logout({errorMessage: "Error de prueba"}));
        expect(state).toEqual(notAuthenticatedState);
     })

    test('should change the status to checking', () => { 
        const state = authSlice.reducer(checkingState, authSlice.actions.checkingCredentials());
        expect(state).toEqual(checkingState);
     })
 }) 