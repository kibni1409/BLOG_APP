import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UserAPI } from '../../DataAccessLayer/API'
import { SetLocalStorage } from '../../DataAccessLayer/WorkWithLocalStorage'

import { UserInitialState } from './UserInitialState'

export const SingInThunk = createAsyncThunk(
  'user/SingInThunk',
  async function ({ email, password }, { rejectWithValue, dispatch }) {
    try {
      let response = await UserAPI.SingIn(email, password)
      dispatch(setUserAC(response.data.user))
      SetLocalStorage('user', JSON.stringify(response.data.user))
      dispatch(setUserAC(response.data))
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
      dispatch(setUserAC(response.user))
      SetLocalStorage('user', JSON.stringify(response.user))
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
      dispatch(setUserAC(response.user))
      SetLocalStorage('user', JSON.stringify(response.user))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const OutThunk = createAsyncThunk('user/OutThunk', async function (_, { rejectWithValue, dispatch }) {
  try {
    dispatch(outUserAC())
    SetLocalStorage('user')
  } catch (error) {
    rejectWithValue(error)
  }
})

const UserSlice = createSlice({
  name: 'User',
  initialState: UserInitialState,
  reducers: {
    setUserAC(state, payload) {
      state.user = payload
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
  extraReducer: {
    [SingInThunk.pending]: (state) => {
      state.statusLoading = 'true'
    },
    [SingInThunk.fulfilled]: (state) => {
      state.statusLoading = 'false'
    },
    [SingInThunk.rejected]: (state, action) => {
      state.statusLoading = 'false'
      state.error = action.payload
    },
  },
})

export const { setUserAC, outUserAC } = UserSlice.actions

export default UserSlice.reducer
