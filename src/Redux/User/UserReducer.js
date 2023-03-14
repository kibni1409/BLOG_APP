import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UserAPI } from '../API'

export const SingInThunk = createAsyncThunk(
  'user/SingInThunk',
  async function ({ email, password }, { rejectWithValue, dispatch }) {
    try {
      let response = await UserAPI.SingIn(email, password)
      dispatch(UserSlice.actions.setUserAC(response.data.user))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
export const SingUpThunk = createAsyncThunk(
  'user/SingUpThunk',
  async function ({ username, email, password }, { rejectWithValue, dispatch }) {
    try {
      let response = await UserAPI.SingUp(username, email, password)
      dispatch(UserSlice.actions.setUserAC(response.user.token))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
export const EditThunk = createAsyncThunk(
  'user/EditThunk',
  async function ({ username, email, password, bio, image }, { rejectWithValue, dispatch }) {
    try {
      let response = await UserAPI.updateUser(username, email, password, bio, image)
      dispatch(UserSlice.actions.editUserAC(response.user))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const OutThunk = createAsyncThunk('user/OutThunk', async function (_, { rejectWithValue, dispatch }) {
  try {
    dispatch(UserSlice.actions.outUserAC())
  } catch (error) {
    rejectWithValue(error)
  }
})

const UserSlice = createSlice({
  name: 'User',
  initialState: {
    user: {
      email: null,
      token: null,
      username: null,
      bio: null,
      image: null,
    },
    statusLoading: '',
  },
  reducers: {
    setUserAC(state, { payload }) {
      state.user = {
        email: payload.email,
        token: payload.token,
        username: payload.username,
      }
    },
    editUserAC(state, { payload }) {
      state.user = {
        payload,
      }
    },
    outUserAC(state) {
      state.user = {
        email: null,
        token: null,
        username: null,
        bio: null,
        image: null,
      }
    },
  },
  extraReducers: {
    [SingInThunk.pending]: (state) => {
      state.statusLoading = 'true'
    },
    [SingInThunk.fulfilled]: (state) => {
      state.statusLoading = 'false'
    },
    [SingInThunk.rejected]: (state, action) => {
      state.loading = 'false'
      console.log(action.payload)
    },
  },
})
export const { getArticles } = UserSlice.actions

export default UserSlice.reducer
