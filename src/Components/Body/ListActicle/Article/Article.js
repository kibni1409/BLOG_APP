import { NavLink } from 'react-router-dom'
import React from 'react'
import { Tag } from 'antd'
import { LikeFilled } from '@ant-design/icons'

import Style from './Article.module.css'

const Article = ({ el }) => {
  let ElementsTag = []
  el.tagList.map((tag, index) => {
    if (tag !== '') {
      ElementsTag.push(
        <Tag className={Style.Tag} key={index}>
          {tag}
        </Tag>
      )
    }
  })
  return (
    <div key={el.createdAt} className={Style.card}>
      <div className={Style.article}>
        <div className={Style.header}>
          <h2 className={Style.title}>{<NavLink to={'/article/' + el.slug}>{el.slug}</NavLink>}</h2>
          <div className={Style.like}>
            <LikeFilled />
            {el.favoritesCount}
          </div>
        </div>
        <div className={Style.tag}>{ElementsTag}</div>
        <p className={Style.description}>{el.description}</p>
      </div>
      <div className={Style.profile}></div>
    </div>
  )
}

export default Article
