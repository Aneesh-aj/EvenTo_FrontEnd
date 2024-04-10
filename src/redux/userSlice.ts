import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "../@types/allTypes";

const initialState: currentUser ={
    role: '',
    name: '',
    email: '',
    id: '',
    user: undefined
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setRole:(state,action)=>{
            state.role = action.payload
        },
        removeRole:(state )=>{
           state.role = ''
        },
        setUser: (state, action) => {
            const { role, name, email, id } = action.payload;
            state.role = role;
            state.name = name;
            state.email = email;
            state.id = id;
          },

        removeUser:(state)=>{
            state.role = '';
            state.email='';
            state.id="";
            state.name="";
        }
    }
})


export const {setRole,removeRole,setUser} = userSlice.actions
export default userSlice.reducer
