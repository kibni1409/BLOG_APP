import './App.css'
import React from 'react'
import { Layout, Pagination } from 'antd'
import { Outlet, Route, Routes } from 'react-router-dom'

import SingIn from './Components/Body/SingIn/SingIn'
import HeaderComp from './Components/Header/Header'
import SingUp from './Components/Body/SingUp/SingUp'
import ListArticle from './Components/Body/ListActicle/ListArticle'

function App() {
  const { Content, Footer } = Layout
  return (
    <div className="App">
      <Layout>
        <HeaderComp />
        <Content>
          <Outlet />
          <Routes>
            <Route path={'/singin'} element={<SingIn />} />
            <Route path={'/singup'} element={<SingUp />} />
            <Route path={'/article'} element={<ListArticle />} />
          </Routes>
        </Content>
        <Footer>
          <Pagination defaultCurrent={1} total={50} />
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  )
}

export default App
