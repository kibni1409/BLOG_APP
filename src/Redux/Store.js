import { configureStore } from '@reduxjs/toolkit'

import UserSlice from './User/UserSlice'
import ArticleSlice from './Article/ArticleSlice'

export default configureStore({
  reducer: {
    User: UserSlice,
    Article: ArticleSlice,
  },
})
