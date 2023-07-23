import { NavLink, useNavigate, useParams } from 'react-router-dom'
import React, { memo, useEffect } from 'react'
import { Spin } from 'antd'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import {
  deleteArticleThunk,
  deleteFavoriteThunk,
  getArticleSlugThunk,
  postFavoriteThunk,
} from '../../../../Redux/Article/ArticleSlice'
import { RouteArticle, RouteArticleFormWithEdit, RouteHome } from '../../../../RoutePath'
import { getLocalStorage } from '../../../../DataAccessLayer/WorkWithLocalStorage'
import TagList from '../../../../Components/TagList/TagList'
import Button from '../../../../Components/Button/Button'
import Avatar from '../../../../Components/Avatar/Avatar'

import Style from './Article.module.css'

const HeaderCard = ({ type, userLocal, dispatch, big }) => {
  function OnClick() {
    if (type.favorited === true) dispatch(deleteFavoriteThunk({ slug: type.slug, big }))
    if (type.favorited === false) dispatch(postFavoriteThunk({ slug: type.slug, big }))
  }
  return (
    <>
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
      <TagList getTagList={type.tagList} />
    </>
  )
}

const BodyCard = ({ type, big }) => {
  return (
    <>
      <p className={Style.description}>{type.description}</p>
      {big ? <ReactMarkdown>{type.body}</ReactMarkdown> : null}
    </>
  )
}

const ProfileCard = ({ userLocal, big, type, dispatch }) => {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  let date = new Date(type.createdAt)
  const navigate = useNavigate()
  function DeleteArticle() {
    dispatch(deleteArticleThunk(type.slug))
    navigate(RouteHome)
  }
  return (
    <div className={Style.profile}>
      <div className={Style.profile_nameBlock}>
        <span className={Style.profile_name}>{type.author.username}</span>
        <span className={Style.profile_date}>{date.toLocaleDateString('en-US', options)}</span>
        {big ? (
          type.author.username === userLocal.username ? (
            <div className={Style.buttons}>
              <Button link={RouteArticleFormWithEdit} tittle={'Edit'} typeClass={'primary'} />
              <Button tittle={'Delete'} typeClass={'link'} callBack={DeleteArticle} />
            </div>
          ) : null
        ) : null}
      </div>
      <Avatar source={type.author.image} />
    </div>
  )
}

const Card = memo(function Card({ type, dispatch, big }) {
  const userLocal = getLocalStorage('user')
  return (
    <div key={type.article} className={Style.card}>
      <div className={Style.article}>
        <HeaderCard type={type} userLocal={userLocal} dispatch={dispatch} big={big} />
        <BodyCard type={type} big={big} />
      </div>
      <ProfileCard userLocal={userLocal} big={big} type={type} dispatch={dispatch} />
    </div>
  )
})

const Article = memo(function Article({ el }) {
  const state = useSelector((state) => state.Article)
  const param = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(param).length !== 0) {
      dispatch(getArticleSlugThunk(param))
    }
  }, [])

  if (!el && state.slugArticles.article) {
    return <Card type={state.slugArticles.article} dispatch={dispatch} big />
  }
  if (el) {
    return <Card type={el} dispatch={dispatch} />
  }
  return <Spin />
})

export default Article
