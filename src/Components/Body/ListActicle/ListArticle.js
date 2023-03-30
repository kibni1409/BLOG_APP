import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import { getArticleAllThunk } from '../../../Redux/Article/ArticleReducer'
import PaginationJS from '../../Footer/Pagination'

import Article from './Article/Article'

const ListArticle = React.memo(function ListArticle() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.Article)
  const [loading, setLoading] = useState(state.statusLoading)
  let ElementsArticle = []
  useEffect(() => {
    dispatch(getArticleAllThunk({}))
  }, [])
  useEffect(() => {
    setLoading(state.statusLoading)
  }, [state.statusLoading])
  if (state.articles.length !== 0) {
    ElementsArticle = state.articles.map((el, index) => <Article key={el.createdAt + index} big={false} el={el} />)
  }
  return (
    <div>
      {loading === true ? <Spin /> : ElementsArticle}
      <PaginationJS />
    </div>
  )
})
export default ListArticle
