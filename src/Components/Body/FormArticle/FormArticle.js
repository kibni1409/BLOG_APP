import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { postNewArticleThunk, updateArticleThunk } from '../../../Redux/Article/ArticleReducer'
import { BodyValidate, DescriptionValidate, TittleValidate } from '../../Validation'
import { RouteArticle, RouteHome, RouteSignIN } from '../../../App'
import { getLocalStorage } from '../../../DataAccessLayer/WorkWithLocalStorage'
import TagList from '../../TagList/TagList'

import Form from './../../Form/Form'
import Input from './../../Input/Input'
import Button from './../../Button/Button'

const FormArticle = () => {
  const { mode } = useParams()
  const state = useSelector((state) => state.Article)
  const [list, setList] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLocal = getLocalStorage('user')
  useEffect(() => {
    if (userLocal === null) {
      navigate(RouteSignIN)
    }
    if (mode !== 'add' && mode !== 'edit') {
      navigate(RouteSignIN)
    }
    if (mode === 'edit' && state.slugArticles.article === undefined) {
      navigate(RouteHome)
    }
    if (state.slugArticles.article) {
      setList(state.slugArticles.article.tagList)
    }
  }, [])
  const onFinish = ({ title, description, body }) => {
    if (mode === 'add') {
      dispatch(postNewArticleThunk({ title, description, body, list }))
      navigate(RouteHome)
    }
    if (mode === 'edit') {
      let slug = state.slugArticles.article.slug
      dispatch(updateArticleThunk({ slug, title, description, body, list }))
      navigate(RouteArticle + slug)
    }
  }
  function GetList(listGet) {
    setList(listGet)
  }

  return (
    <Form title={mode === 'add' ? 'New article' : 'Edit article'} callBack={onFinish}>
      <Input label={'Tittle'} name={'tittle'} validator={TittleValidate} />
      <Input label={'Description'} name={'description'} validator={DescriptionValidate} />
      <Input label={'Body'} name={'body'} validator={BodyValidate} />
      <TagList setTagList={GetList} />
      <Button type={'submit'} typeClass={'primary'} tittle={'Submit'} />
    </Form>
  )
}

export default FormArticle
