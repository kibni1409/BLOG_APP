import { configureStore } from '@reduxjs/toolkit'

import UserSlice from './User/UserReducer'
import ArticleSlice from './Article/ArticleReducer'

export default configureStore({
  reducer: {
    User: UserSlice,
    Article: ArticleSlice,
  },
})
