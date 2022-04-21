import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';


const initialState = {
  pictures: [],
  loading: true,
};

export const picsSlice = createSlice({
  name: 'picsSlice',
  initialState,
  reducers: {
    setPictures: (state, action) => {
      const rawPics = action.payload;
      const pictures = [];
      for (let i = 0; i < rawPics.length; i = i + 3) {
        const index = Math.min(i, rawPics.length);
        pictures.push(rawPics.slice(index, index + 3));
      }
      state.pictures = pictures;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const fetchPictures = () => {
  return async (dispatch) => {
    return Axios.get('https://picsum.photos/v2/list')
      .then((response) => {
        dispatch(setPictures(response.data));
      })
      .catch(err => console.log(err));
  };
};

export const {
  setPictures,
  setLoading,
} = picsSlice.actions;

export default picsSlice.reducer;
