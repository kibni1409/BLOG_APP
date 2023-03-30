import { NavLink, useNavigate, useParams } from 'react-router-dom'
import React, { memo, useEffect } from 'react'
import { Avatar, Button, message, Popconfirm, Spin, Tag } from 'antd'
import { LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import {
  deleteArticleThunk,
  deleteFavoriteThunk,
  getArticleSlugThunk,
  postFavoriteThunk,
} from '../../../../Redux/Article/ArticleReducer'
import { RouteArticle, RouteArticleFormWithEdit, RouteHome } from '../../../../App'
import { getLocalStorage } from '../../../../DataAccessLayer/WorkWithLocalStorage'

import Style from './Article.module.css'

const Article = memo(function Article({ el, big }) {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const state = useSelector((state) => state.Article)
  const userLocal = getLocalStorage('user')
  const param = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(param).length !== 0) {
      dispatch(getArticleSlugThunk(param))
    }
  }, [])
  let ElementsTag = []
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success',
    })
  }

  const Card = memo(function Card({ type }) {
    function Delete() {
      dispatch(deleteArticleThunk(type.slug))
      success()
      navigate(RouteHome)
    }
    function OnClick() {
      if (type.favorited === true) dispatch(deleteFavoriteThunk({ slug: type.slug, big }))
      if (type.favorited === false) dispatch(postFavoriteThunk({ slug: type.slug, big }))
    }
    type.tagList.map((tag, index) => {
      if (tag !== '') {
        ElementsTag.push(
          <Tag className={Style.Tag} key={index}>
            {tag}
          </Tag>
        )
      }
    })
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let date = new Date(type.createdAt)
    return (
      <div key={type.article} className={Style.card}>
        {contextHolder}
        <div className={Style.article}>
          <div className={Style.header}>
            <h2 className={Style.title}>
              {big ? type.title : <NavLink to={RouteArticle + type.slug}>{type.title}</NavLink>}
            </h2>
            <div className={Style.like}>
              {userLocal.username ? (
                type.favorited ? (
                  <LikeOutlined onClick={OnClick} />
                ) : (
                  <LikeFilled onClick={OnClick} />
                )
              ) : (
                <LikeFilled />
              )}
              {type.favoritesCount}
            </div>
          </div>
          <div className={Style.tag}>{ElementsTag}</div>
          <p className={Style.description}>{type.description}</p>
          {big ? <ReactMarkdown>{type.body}</ReactMarkdown> : null}
        </div>
        <div className={Style.profile}>
          <div className={Style.profile_nameBlock}>
            <span className={Style.profile_name}>{type.author.username}</span>
            <span className={Style.profile_date}>{date.toLocaleDateString('en-US', options)}</span>
            {big === true ? (
              type.author.username === userLocal.username ? (
                <div className={Style.buttons}>
                  <Button>
                    <NavLink to={RouteArticleFormWithEdit}>Edit</NavLink>
                  </Button>
                  <Popconfirm
                    title="Delete the article"
                    description="Are you sure to delete this article?"
                    onConfirm={Delete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger ghost>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              ) : null
            ) : null}
          </div>
          <Avatar size={46} icon={<UserOutlined />} src={type.author.image} />
        </div>
      </div>
    )
  })
  if (!el && state.slugArticles.article) {
    return <Card type={state.slugArticles.article} big={true} />
  }
  if (el) {
    return <Card type={el} big={false} />
  }
  return <Spin />
})

export default Article
