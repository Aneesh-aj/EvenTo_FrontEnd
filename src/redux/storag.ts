import { configureStore } from "@reduxjs/toolkit";

import roleReducer from './roleSlice'

const store = configureStore({
    reducer:{
        user: roleReducer,
    }
})

export default store