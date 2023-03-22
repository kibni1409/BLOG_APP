import { NavLink, useParams } from 'react-router-dom'
import React, { memo, useEffect } from 'react'
import { Avatar, Spin, Tag } from 'antd'
import { LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { deleteFavoriteThunk, getArticleSlugThunk, postFavoriteThunk } from '../../../../Redux/Article/ArticleReducer'

import Style from './Article.module.css'

const Article = memo(function Article({ el, big }) {
  const state = useSelector((state) => state.Article)
  const stateUser = localStorage.user ? JSON.parse(localStorage.user) : { username: null }
  const param = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(param).length !== 0) {
      dispatch(getArticleSlugThunk(param))
    }
  }, [])
  let ElementsTag = []

  const Card = memo(function Card({ type }) {
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
        <div className={Style.article}>
          <div className={Style.header}>
            <h2 className={Style.title}>
              {big ? type.slug : <NavLink to={'/article/' + type.slug}>{type.slug}</NavLink>}
            </h2>
            <div className={Style.like}>
              {stateUser.username ? (
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
          {big ? <p className={Style.body}>{type.body}</p> : null}
        </div>
        <div className={Style.profile}>
          <div className={Style.profile_nameBlock}>
            <span className={Style.profile_name}>{type.author.username}</span>
            <span className={Style.profile_date}>{date.toLocaleDateString('en-US', options)}</span>
          </div>
          {type.author.image ? (
            <img className={Style.profile_img} alt={state} src={type.author.image} />
          ) : (
            <Avatar size={46} icon={<UserOutlined />} />
          )}{' '}
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
