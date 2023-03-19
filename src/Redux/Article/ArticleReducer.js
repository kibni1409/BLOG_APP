import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ArticleAPI } from '../API'

export const getArticleAllThunk = createAsyncThunk(
  'user/getArticleAllThunk',
  async function (page, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.getArticlesGlobally(page)
      dispatch(ArticleSlice.actions.setArticleAC(response.data))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getArticleSlugThunk = createAsyncThunk(
  'user/getArticleSlugThunk',
  async function ({ slug }, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.getArticleSlug(slug)
      dispatch(ArticleSlice.actions.setSlugArticleAC(response.data))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const ArticleSlice = createSlice({
  name: 'User',
  initialState: {
    articles: [],
    slugArticles: {
      slug: null,
      title: null,
      description: null,
      body: null,
      tagList: [null],
      createdAt: null,
      updatedAt: null,
      favorited: true,
      favoritesCount: 0,
      author: {
        username: null,
        bio: null,
        image: null,
        following: true,
      },
    },
    articlesCount: 0,
    statusLoading: false,
    error: '',
  },
  reducers: {
    setArticleAC(state, payload) {
      state.articles = payload.payload.articles
      state.articlesCount = payload.payload.articlesCount
    },
    setSlugArticleAC(state, { payload }) {
      state.slugArticles = payload
    },
  },
  extraReducers: {
    [getArticleAllThunk.pending]: (state) => {
      state.statusLoading = true
    },
    [getArticleAllThunk.fulfilled]: (state) => {
      state.statusLoading = false
    },
    [getArticleAllThunk.rejected]: (state, action) => {
      state.statusLoading = false
      state.error = action
    },
    [getArticleSlugThunk.pending]: (state) => {
      state.statusLoading = true
      state.articlesCount = 0
    },
    [getArticleSlugThunk.fulfilled]: (state) => {
      state.statusLoading = false
      state.articlesCount = 0
    },
    [getArticleSlugThunk.rejected]: (state, action) => {
      state.statusLoading = false
      state.error = action
      state.articlesCount = 0
    },
  },
})

export default ArticleSlice.reducer
