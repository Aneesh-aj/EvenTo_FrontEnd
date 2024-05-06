import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "../@types/allTypes";

const initialState: currentUser ={
    role: '',
    name: '',
    email: '',
    id: '',
    blocked:false,
    approve:false,
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
            const { role, name, email, id ,blocked,approve} = action.payload;
            state.role = role;
            state.name = name;
            state.email = email;
            state.id = id;
            state.blocked = blocked
            state.approve = approve
          },
          setApproval:(state,action)=>{
              const {approvel} = action.payload
              state.approve = approvel
          },

        removeUser:(state)=>{
            state.role = '';
            state.email='';
            state.id="";
            state.name="";
        }
    }
})


export const {setRole,removeRole,setUser,setApproval} = userSlice.actions
export default userSlice.reducer
