import { NavLink, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Avatar, Spin, Tag } from 'antd'
import { LikeFilled, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { getArticleSlugThunk } from '../../../../Redux/Article/ArticleReducer'

import Style from './Article.module.css'

const Article = ({ el, big }) => {
  const state = useSelector((state) => state.Article)
  const stateUser = useSelector((state) => state.User)
  const param = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(param).length !== 0) {
      dispatch(getArticleSlugThunk(param))
    }
  }, [])
  let ElementsTag = []
  function OnClick() {
    console.log(' + 1')
  }
  function Card({ type }) {
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
              {stateUser.user.username ? <LikeFilled onClick={OnClick} /> : <LikeFilled />}
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
  }
  if (!el && state.slugArticles.article) {
    return <Card type={state.slugArticles.article} big={true} />
  }
  if (el) {
    return <Card type={el} big={false} />
  }
  return <Spin />
}

export default Article
