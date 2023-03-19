import { Pagination } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getArticleAllThunk } from '../../Redux/Article/ArticleReducer'

const PaginationJS = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.Article)
  function onChangePagination(e) {
    dispatch(getArticleAllThunk({ offset: e }))
  }
  return (
    <div>
      {state.articlesCount !== 0 ? (
        <Pagination
          simple
          defaultCurrent={1}
          total={state.articlesCount}
          defaultPageSize={20}
          onChange={onChangePagination}
        />
      ) : null}
    </div>
  )
}

export default PaginationJS
