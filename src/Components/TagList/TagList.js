import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'

import Input from '../Input/Input'
import Button from '../Button/Button'

import Style from './Tag.module.css'

const TagList = ({ setTagList, getTagList }) => {
  const ref = useRef()
  const [tagList, setTag] = useState([])
  useEffect(() => {
    if (setTagList) setTagList(tagList)
    if (getTagList) setTag(getTagList)
  }, [tagList])

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
    <span className={Style.Tag} key={uuidv4()}>
      {getTagList ? null : <DeleteOutlined onClick={() => RemoveTag(tag)} />}
      {tag}
    </span>
  ))

  return (
    <div className={Style.TagList}>
      {getTagList ? null : (
        <Input ref={ref} label={'Tags'} name={'tags'}>
          <Button type={'submit'} typeClass={'primary'} tittle={'Add Tag'} callBack={AddTag} />
        </Input>
      )}
      {ElementsTag}
    </div>
  )
}

export default TagList
