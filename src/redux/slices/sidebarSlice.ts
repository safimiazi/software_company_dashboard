import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    open: boolean;
}

const initialState: SidebarState  = {
    open : true
}


export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        sidebarToggle : (state) => {
            state.open = !state.open
        }
    }

})

export const { sidebarToggle} = sidebarSlice.actions;
export default sidebarSlice.reducer;