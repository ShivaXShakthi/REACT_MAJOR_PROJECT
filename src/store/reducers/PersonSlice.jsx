import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info : null,
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {

    loadPersonInfo : (state, action) => {
        state.info = action.payload;
    },

    removePersonInfo : (state, action) => {
        state.info = null;
    }


  },
})

// Action creators are generated for each case reducer function
export const { loadPersonInfo, removePersonInfo  } = personSlice.actions

export default personSlice.reducer