import React, { useRef, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'

import Input from '../Input/Input'
import Button from '../Button/Button'

import Style from './Tag.module.css'

const Tag = ({ tittle, children }) => {
  return (
    <span className={Style.Tag}>
      {children}
      {tittle}
    </span>
  )
}

const TagList = () => {
  const ref = useRef()
  const [tagList, setTag] = useState([])

  function AddTag(e) {
    if (!tagList.includes(ref.current.getValue())) {
      setTag([...tagList, ref.current.getValue()])
      ref.current.clear()
    } else {
      ref.current.clear()
    }

    e.preventDefault()
  }

  function RemoveTag(tittle) {
    let res = tagList.filter((tag) => tag !== tittle)
    setTag(res)
  }

  const ElementsTag = tagList.map((tag) => (
    <Tag tittle={tag} key={tag}>
      <DeleteOutlined onClick={() => RemoveTag(tag)} />
    </Tag>
  ))

  return (
    <div className={Style.TagList}>
      <Input ref={ref} label={'Tags'} name={'tags'}>
        <Button type={'submit'} typeClass={'primary'} tittle={'Add Tag'} callBack={AddTag} />
      </Input>
      {ElementsTag}
    </div>
  )
}

export default TagList
