import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/MovieSlice'
import tvshowReducer from './reducers/TvshowSlice'
import personReducer from './reducers/PersonSlice'

export const Store = configureStore({
  reducer: {
    movie : movieReducer,
    tvshow : tvshowReducer,
    person : personReducer  
  },
})