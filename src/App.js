import './App.css'
import React from 'react'
import { Layout } from 'antd'
import { Outlet, Route, Routes } from 'react-router-dom'

import SingIn from './views/Body/SingIn/SingIn'
import HeaderComp from './views/Header/Header'
import SingUp from './views/Body/SingUp/SingUp'
import ListArticle from './views/Body/ListActicle/ListArticle'
import Article from './views/Body/ListActicle/Article/Article'
import Profile from './views/Body/Profile/Profile'
import FormArticle from './views/Body/FormArticle/FormArticle'
import {
  RouteArticle,
  RouteArticleFormWithMode,
  RouteArticleWithSlug,
  RouteHome,
  RouteProfile,
  RouteSignIN,
  RouteSignUP,
} from './RoutePath'

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
            <Route path={RouteArticleWithSlug} element={<Article big />} />
          </Routes>
        </Content>
        <Footer>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </div>
  )
}

export default App
