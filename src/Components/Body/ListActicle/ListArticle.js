import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import React, { useEffect } from 'react'

import { getArticleAllThunk } from '../../../Redux/Article/ArticleReducer'

import Article from './Article/Article'

const ListArticle = React.memo(function ListArticle() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.Article)
  let ElementsArticle = []
  useEffect(() => {
    dispatch(getArticleAllThunk({}))
  }, [])
  if (state.articles.length !== 0) {
    ElementsArticle = state.articles.map((el, index) => <Article key={el.createdAt + index} big={false} el={el} />)
  }
  return <div>{state.statusLoading === true ? <Spin /> : ElementsArticle}</div>
})
export default ListArticle
