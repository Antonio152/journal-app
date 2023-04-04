import React from 'react';
import { Provider } from "react-redux"; 
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render,fireEvent } from '@testing-library/react'
import { authSlice } from "../../../src/store/auth/authSlice";
import { Login } from "../../../src/auth/pages/Login";
import { notAuthenticatedState } from '../../fixtures/authFixtures';
import { startLoginWithEmailPassword } from '../../../src/store/auth/thunks';

/* Mock */
const mockstartGoogleSignIn = jest.fn()
jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIn:()=>mockstartGoogleSignIn,
    startLoginWithEmailPassword:jest.fn()
}))
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=>(fn=()=>{})=>fn()
}))

/* Store for  testing */
const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: { ...notAuthenticatedState, errorMessage:null  }
    }
});

describe('Testing Login page', () => { 
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('should render the component', () => { 
        const { getAllByText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        </Provider>
        )
       expect(getAllByText('Login').length).toBeGreaterThanOrEqual(1)
     })
     test('should be call google sign in', () => { 
        const { getByLabelText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        </Provider>
        )
        const googleButton = getByLabelText("Google-btn")
        fireEvent.click(googleButton)
        expect(mockstartGoogleSignIn).toHaveBeenCalled()
      })

      test('should be call login with email and password', () => {
        const { getByRole,getByTestId, getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </Provider>
            )
            const emailInput = getByRole("textbox",{name:"correo"})
            const passwordInput = getByTestId("password")
            const submitForm = getByLabelText("formSubmit")
            fireEvent.change(emailInput, { target: { name:"email", value: "antonio@mail.com" } })
            fireEvent.change(passwordInput, { target: {name:"password", value: "123" } })
            fireEvent.submit(submitForm)
            expect(mockstartGoogleSignIn).not.toHaveBeenCalled()
            expect(startLoginWithEmailPassword).toHaveBeenCalledWith("antonio@mail.com","123")
        })
 })

 /* import React from "react"
import { Provider } from "react-redux"; 
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render,fireEvent } from '@testing-library/react'
import { authSlice } from "../../../src/store/auth/authSlice";
import { Login } from "../../../src/auth/pages/Login";
import { notAuthenticatedState } from '../../fixtures/authFixtures';
import { startLoginWithEmailPassword } from '../../../src/store/auth/thunks';

jest.mock("../../../src/store/auth/thunks", () => ({
    startLoginWithEmailPassword: jest.fn()
}))
const dispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=>dispatch
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: { ...notAuthenticatedState, errorMessage:null  }
    }
});
describe('test', () => { 
    test('should call login with email and password', () => {
        const { getByRole,getByTestId, getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </Provider>
            )
            const emailInput = getByRole("textbox",{name:"correo"})
            const passwordInput = getByTestId("password")
            const submitForm = getByLabelText("formSubmit")
            fireEvent.change(emailInput, { target: { name:"email", value: "antonio@mail.com" } })
            fireEvent.change(passwordInput, { target: {name:"password", value: "123" } })
            fireEvent.submit(submitForm)
            expect(startLoginWithEmailPassword).toHaveBeenCalledWith("antonio@mail.com","123")
        })
 }) */