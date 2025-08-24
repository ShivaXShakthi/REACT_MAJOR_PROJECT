import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info : null,
}

export const TvshowSlice = createSlice({
  name: 'tvshow',
  initialState,
  reducers: {

    loadTvshowInfo : (state, action) => {
        state.info = action.payload;
    },

    removeTvshowInfo : (state, action) => {
        state.info = null;
    }


  },
})

// Action creators are generated for each case reducer function
export const { loadTvshowInfo , removeTvshowInfo  } = TvshowSlice.actions

export default TvshowSlice.reducer