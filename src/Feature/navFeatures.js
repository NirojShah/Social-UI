import { createSlice } from "@reduxjs/toolkit";

const navFeature = createSlice({
    name:"navFeature",
    initialState:{
        value:{
            id:""
        }
    },
    reducers:{
        idInitializer : (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {idInitializer} = navFeature.actions
export default navFeature.reducer