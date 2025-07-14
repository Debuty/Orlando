import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Chalet, Review } from '../types';
import { HOME_CONTENT } from '../utils/constants';

interface HomeState {
  featuredChalets: Chalet[];
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  featuredChalets: HOME_CONTENT.featuredChalets.chalets.map(chalet => ({...chalet})),
  reviews: HOME_CONTENT.reviews.testimonials.map(review => ({...review})),
  isLoading: false,
  error: null
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setFeaturedChalets: (state, action: PayloadAction<Chalet[]>) => {
      state.featuredChalets = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setFeaturedChalets, setReviews, setLoading, setError } = homeSlice.actions;
export default homeSlice.reducer; 