import './App.css'
import React from 'react'
import { Layout } from 'antd'
import { Outlet, Route, Routes } from 'react-router-dom'

import SingIn from './Components/Body/SingIn/SingIn'
import HeaderComp from './Components/Header/Header'
import SingUp from './Components/Body/SingUp/SingUp'
import ListArticle from './Components/Body/ListActicle/ListArticle'
import Article from './Components/Body/ListActicle/Article/Article'
import PaginationJS from './Components/Footer/Pagination'
import Profile from './Components/Body/Profile/Profile'
import FormArticle from './Components/Body/FormArticle/FormArticle'

function App() {
  const { Content, Footer } = Layout
  return (
    <div className="App">
      <Layout>
        <HeaderComp />
        <Content>
          <Outlet />
          <Routes>
            <Route path={'/'} element={<ListArticle />} />
            <Route path={'/article-form/:mode'} element={<FormArticle />} />
            <Route path={'/sing-in'} element={<SingIn />} />
            <Route path={'/sing-up'} element={<SingUp />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/article'} element={<ListArticle />} />
            <Route path={'/article/:slug'} element={<Article big={true} />} />
          </Routes>
        </Content>
        <Footer>
          <PaginationJS />
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  )
}

export default App
