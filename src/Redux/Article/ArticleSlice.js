import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ArticleAPI } from '../../DataAccessLayer/API'

import { ActicleInitialState } from './ActicleInitialState'

export const getArticleAllThunk = createAsyncThunk(
  'article/getArticleAllThunk',
  async function (page, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.getArticlesGlobally(page)
      dispatch(setArticleAC(response.data))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const postFavoriteThunk = createAsyncThunk(
  'article/postFavoriteThunk',
  async function ({ slug, big }, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.favoriteArticle(slug)
      if (big === false) {
        dispatch(setFavoritedAC(response.data))
      }
      if (big === true) {
        dispatch(setFavoritedAC(response.data))
        dispatch(setSlugArticleAC(response.data))
      }
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteFavoriteThunk = createAsyncThunk(
  'article/deleteFavoriteThunk',
  async function ({ slug, big }, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.unFavoriteArticle(slug)
      if (big === false) {
        dispatch(setFavoritedAC(response.data))
      }
      if (big === true) {
        dispatch(setFavoritedAC(response.data))
        dispatch(setSlugArticleAC(response.data))
      }
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getArticleSlugThunk = createAsyncThunk(
  'article/getArticleSlugThunk',
  async function ({ slug }, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.getArticleSlug(slug)
      dispatch(setSlugArticleAC(response.data))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const postNewArticleThunk = createAsyncThunk(
  'article/postNewArticleThunk',
  async function ({ title, description, body, tagList }, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.createArticle(title, description, body, tagList)
      dispatch(getArticleAllThunk({}))
      dispatch(setSlugArticleAC(response.data))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const updateArticleThunk = createAsyncThunk(
  'article/updateArticleThunk',
  async function ({ slug, title, description, body, tagList }, { rejectWithValue, dispatch }) {
    try {
      let response = await ArticleAPI.updateArticle(slug, title, description, body, tagList)
      dispatch(setSlugArticleAC(response.data))
      dispatch(getArticleAllThunk({}))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteArticleThunk = createAsyncThunk(
  'article/deleteArticleThunk',
  async function (slug, { rejectWithValue }) {
    try {
      await ArticleAPI.deleteArticle(slug)
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const ArticleSlice = createSlice({
  name: 'Article',
  initialState: ActicleInitialState,
  reducers: {
    setArticleAC(state, payload) {
      state.articles = payload.payload.articles
      state.articlesCount = payload.payload.articlesCount
    },
    setSlugArticleAC(state, { payload }) {
      state.slugArticles = payload
    },
    setFavoritedAC(state, { payload }) {
      state.articles = state.articles.map((el) => {
        if (el.slug === payload.article.slug) {
          return {
            ...el,
            favorited: payload.article.favorited,
            favoritesCount: payload.article.favoritesCount,
          }
        } else {
          return el
        }
      })
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

export const { setArticleAC, setSlugArticleAC, setFavoritedAC } = ArticleSlice.actions

export default ArticleSlice.reducer
