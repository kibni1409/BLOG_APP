import { Pagination } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getArticleAllThunk } from '../../Redux/Article/ArticleSlice'

const PaginationJS = () => {
  const [current, setCurrent] = useState(1)
  const dispatch = useDispatch()
  const state = useSelector((state) => state.Article)

  function onChangePagination(e) {
    dispatch(getArticleAllThunk({ offset: e }))
    setCurrent(e)
  }

  return (
    <div>
      <Pagination
        current={current}
        total={state.articlesCount}
        defaultPageSize={20}
        onChange={onChangePagination}
        showSizeChanger={false}
      />
    </div>
  )
}

export default PaginationJS
