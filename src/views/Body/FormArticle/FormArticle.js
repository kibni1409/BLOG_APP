import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { postNewArticleThunk, updateArticleThunk } from '../../../Redux/Article/ArticleSlice'
import { BodyValidate, DescriptionValidate, TittleValidate } from '../../../Validation'
import { RouteArticle, RouteHome, RouteSignIN } from '../../../RoutePath'
import TagList from '../../../Components/TagList/TagList'
import withAuth from '../../../HOC/withAuth'
import Form from '../../../Components/Form/Form'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'

const FormArticle = () => {
  const { mode } = useParams()
  const state = useSelector((state) => state.Article)
  const [list, setList] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
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
  const onFinish = (e) => {
    const objForm = {
      title: e.target[0].value,
      description: e.target[1].value,
      body: e.target[2].value,
      list,
    }
    if (mode === 'add') {
      dispatch(postNewArticleThunk(objForm))
      navigate(RouteHome)
    }
    if (mode === 'edit') {
      let slug = state.slugArticles.article.slug
      dispatch(updateArticleThunk(objForm))
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

export default withAuth(FormArticle)
