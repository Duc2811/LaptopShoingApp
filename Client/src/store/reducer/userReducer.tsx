import { createAction, createReducer } from '@reduxjs/toolkit'

interface User {
    _id: string,
    token: string,
    notification: number
}

const initalState = {
    user: { _id: "", token: "" },
    notification: 0
};

export const doLogin = createAction<User>('user/doLogin')
export const doLogout = createAction('user/doLogout')


const userReducer = createReducer(initalState, builder => {
    builder.addCase(doLogin, (state, action) => {
        state.user = action.payload;
    }).addCase(doLogout, (state) => {
        state.user = initalState.user;
    })
})

export default userReducer;