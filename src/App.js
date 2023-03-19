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
            <Route path={'/singin'} element={<SingIn />} />
            <Route path={'/singup'} element={<SingUp />} />
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
