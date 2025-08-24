import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info : null,
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

    loadMovieInfo : (state, action) => {
        state.info = action.payload;
    },

    removeMovieInfo : (state, action) => {
        state.info = null;
    }


  },
})

// Action creators are generated for each case reducer function
export const { loadMovieInfo, removeMovieInfo  } = movieSlice.actions

export default movieSlice.reducer