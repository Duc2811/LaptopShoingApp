import { createAction, createReducer } from '@reduxjs/toolkit'

interface User {
    _id: string,
    token: string,
    notification: number
}

const initalState = {
    user: { _id: "", token: "" },
    darkMode: false,
    notification: 0
};

export const doLogin = createAction<User>('user/doLogin')
export const doLogout = createAction('user/doLogout')
export const doDarkMode = createAction<boolean>('user/doDarkMode')

const userReducer = createReducer(initalState, builder => {
    builder.addCase(doLogin, (state, action) => {
        state.user = action.payload;
    }).addCase(doLogout, (state) => {
        state.user = initalState.user;
    }).addCase(doDarkMode, (state, action) => {
        state.darkMode = action.payload
    })
})

export default userReducer;