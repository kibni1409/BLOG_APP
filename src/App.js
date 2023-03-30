import './App.css'
import React from 'react'
import { Layout } from 'antd'
import { Outlet, Route, Routes } from 'react-router-dom'

import SingIn from './Components/Body/SingIn/SingIn'
import HeaderComp from './Components/Header/Header'
import SingUp from './Components/Body/SingUp/SingUp'
import ListArticle from './Components/Body/ListActicle/ListArticle'
import Article from './Components/Body/ListActicle/Article/Article'
import Profile from './Components/Body/Profile/Profile'
import FormArticle from './Components/Body/FormArticle/FormArticle'

export const RouteHome = '/'
export const RouteArticleFormWithMode = '/article-form/:mode'
export const RouteArticleFormWithAdd = '/article-form/add'
export const RouteArticleFormWithEdit = '/article-form/edit'
export const RouteSignIN = '/sign-in'
export const RouteSignUP = '/sign-up'
export const RouteProfile = '/profile'
export const RouteArticle = '/article/'
export const RouteArticleWithSlug = '/article/:slug'
function App() {
  const { Content, Footer } = Layout
  return (
    <div className="App">
      <Layout>
        <HeaderComp />
        <Content>
          <Outlet />
          <Routes>
            <Route path={RouteHome} element={<ListArticle />} />
            <Route path={RouteArticleFormWithMode} element={<FormArticle />} />
            <Route path={RouteSignIN} element={<SingIn />} />
            <Route path={RouteSignUP} element={<SingUp />} />
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteArticle} element={<ListArticle />} />
            <Route path={RouteArticleWithSlug} element={<Article big={true} />} />
          </Routes>
        </Content>
        <Footer>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </div>
  )
}

export default App
