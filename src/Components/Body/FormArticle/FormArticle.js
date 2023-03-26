import { Button, Form, Input, message, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import Search from 'antd/es/input/Search'

import { postNewArticleThunk, updateArticleThunk } from '../../../Redux/Article/ArticleReducer'

import Style from './FormArticle.module.css'

const FormArticle = () => {
  const { mode } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const state = useSelector((state) => state.Article)
  const [tagList, setTag] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/sing-in')
    }
    if (mode !== 'add' && mode !== 'edit') {
      navigate('/sing-in')
    }
    if (mode === 'edit' && state.slugArticles.article === undefined) {
      navigate('/')
    }
    if (state.slugArticles.article) {
      setTag(state.slugArticles.article.tagList)
    }
  }, [])
  let ElementsTag = tagList.map((tag, index) => (
    <Tag icon={<DeleteOutlined onClick={() => RemoveTag(tag)} />} key={index}>
      {tag}
    </Tag>
  ))
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    })
  }
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
    })
  }
  const onFinish = ({ title, description, body }) => {
    if (mode === 'add') dispatch(postNewArticleThunk({ title, description, body, tagList }))
    if (mode === 'edit') {
      let slug = state.slugArticles.article.slug
      dispatch(updateArticleThunk({ slug, title, description, body, tagList }))
    }
    success()
    navigate('/')
  }
  const onFinishFailed = () => {
    error('Не все поля заполнены')
  }
  function AddTag(data) {
    if (tagList.includes(data)) {
      error('Tag already exists ')
    } else {
      setTag([...tagList, data])
    }
  }
  function RemoveTag(data) {
    let res = tagList.filter((tag) => tag !== data)
    setTag(res)
  }
  return (
    <div className={Style.form}>
      <h2>
        {mode === 'add' ? 'New article' : null}
        {mode === 'edit' ? 'Edit article' : null}
      </h2>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={
          mode === 'edit'
            ? state.slugArticles.article
              ? {
                  title: state.slugArticles.article.title,
                  description: state.slugArticles.article.description,
                  body: state.slugArticles.article.body,
                }
              : null
            : null
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your description!',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[
            {
              required: true,
              message: 'Please input your body!',
            },
          ]}
        >
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item label="Tag" name="tag" rules={[]}>
          <Search placeholder="input tag" enterButton="Add" size="large" onSearch={AddTag} />
        </Form.Item>
        {ElementsTag}
        <FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default FormArticle