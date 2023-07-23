import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { memo, useEffect, useState } from 'react'

import { getArticleAllThunk } from '../../../Redux/Article/ArticleSlice'
import PaginationJS from '../../Footer/Pagination'
import withAuth from '../../../HOC/withAuth'

import Article from './Article/Article'

const ListArticle = memo(function ListArticle() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.Article)
  const [loading, setLoading] = useState(state.statusLoading)
  let ElementsArticle = []
  useEffect(() => {
    dispatch(getArticleAllThunk(0))
  }, [])
  useEffect(() => {
    setLoading(state.statusLoading)
  }, [state.statusLoading])
  if (state.articles.length !== 0) {
    ElementsArticle = state.articles.map((el, index) => <Article key={el.createdAt + index} el={el} />)
  }
  return (
    <div>
      {loading === true ? <Spin /> : ElementsArticle}
      <PaginationJS />
    </div>
  )
})
export default withAuth(ListArticle)
