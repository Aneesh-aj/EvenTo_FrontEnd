import { createSlice } from "@reduxjs/toolkit";

const initialState={
    role:null,
}


const roleSlice = createSlice({
    name:'role',
    initialState,
    reducers:{
        setRole:(state,action)=>{
            state.role = action.payload
        },
        removeRole:(state )=>{
           state.role = null
        }
    }
})


export const {setRole,removeRole} = roleSlice.actions
export default roleSlice.reducer
