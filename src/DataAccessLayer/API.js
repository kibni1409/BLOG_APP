import axios from 'axios'

import { getLocalStorage } from './WorkWithLocalStorage'

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Token ',
  },
})

export const UserAPI = {
  SingUp(username, email, password) {
    return instance
      .post('users', {
        user: {
          username: username,
          email: email,
          password: password,
        },
      })
      .then((response) => response.data)
  },
  SingIn(email, password) {
    return instance
      .post('users/login', {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => response)
  },
  updateUser(username, email, password, bio = '', image = '') {
    let user = getLocalStorage('user')
    return instance
      .put(
        'user',
        {
          user: {
            email: email,
            password: password,
            username: username,
            bio: bio,
            image: image,
          },
        },
        { headers: { Authorization: 'Token ' + user.token } }
      )
      .then((response) => response.data)
  },
}

export const ArticleAPI = {
  getArticlesGlobally(obj) {
    let getArticle =
      'articles?' +
      (obj.tag ? 'tag=' + obj.tag : '') +
      (obj.author ? '&author=' + obj.author : '') +
      (obj.favorited ? '&favorited=' + obj.favorited : '') +
      (obj.limit ? '&limit=' + obj.limit : '') +
      (obj.offset ? '&offset=' + (obj.offset * (obj.limit ? obj.limit : 20) - 20) : '')
    return instance.get(getArticle).then((response) => response)
  },
  createArticle(title, description, body, tagList) {
    let user = getLocalStorage('user')
    return instance
      .post(
        'articles',
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        { headers: { Authorization: 'Token ' + user.token } }
      )
      .then((response) => response)
  },
  getArticleSlug(slug) {
    return instance.get('articles/' + slug).then((response) => response)
  },
  updateArticle(slug, title, description, body, tagList) {
    let user = getLocalStorage('user')
    return instance
      .put(
        'articles/' + slug,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        { headers: { Authorization: 'Token ' + user.token } }
      )
      .then((response) => response)
  },
  deleteArticle(slug) {
    let user = getLocalStorage('user')
    return instance
      .delete('articles/' + slug, { headers: { Authorization: 'Token ' + user.token } })
      .then((response) => response)
  },
  favoriteArticle(slug) {
    let user = getLocalStorage('user')
    return instance
      .post('articles/' + slug + '/favorite', {}, { headers: { Authorization: 'Token ' + user.token } })
      .then((response) => response)
  },
  unFavoriteArticle(slug) {
    let user = getLocalStorage('user')
    return instance
      .delete('articles/' + slug + '/favorite', { headers: { Authorization: 'Token ' + user.token } })
      .then((response) => response)
  },
}
