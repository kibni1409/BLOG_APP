import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ArticleAPI } from '../API'

export const getArticleAllThunk = createAsyncThunk(
  'user/getArticleAllThunk',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.getArticlesGlobally()
      dispatch(ArticleSlice.actions.setArticleAC(response.data))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const ArticleSlice = createSlice({
  name: 'User',
  initialState: {
    article: {
      articles: [],
    },
    statusLoading: '',
  },
  reducers: {
    setArticleAC(state, { payload }) {
      state.article = payload
    },
  },
  extraReducers: {
    [getArticleAllThunk.pending]: (state) => {
      state.statusLoading = 'true'
    },
    [getArticleAllThunk.fulfilled]: (state) => {
      state.statusLoading = 'false'
    },
    [getArticleAllThunk.rejected]: (state, action) => {
      state.loading = 'false'
      console.log(action.payload)
    },
  },
})

export default ArticleSlice.reducer
