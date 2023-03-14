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
    dispatch(getArticleAllThunk())
  }, [])
  if (state.article.articles !== []) {
    ElementsArticle = state.article.articles.map((el) => <Article key={el.createdAt} el={el} />)
  }
  return <div>{state.article.articles === [] ? <Spin /> : ElementsArticle}</div>
})
export default ListArticle
