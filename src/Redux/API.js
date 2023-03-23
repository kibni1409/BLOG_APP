import axios from 'axios'

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { token: null }
const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Token ' + user.token,
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
    return instance
      .put('user', {
        user: {
          email: email,
          password: password,
          username: username,
          bio: bio,
          image: image,
        },
      })
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
    return instance
      .post('articles', {
        article: {
          title,
          description,
          body,
          tagList,
        },
      })
      .then((response) => response)
  },
  getArticleSlug(slug) {
    return instance.get('articles/' + slug).then((response) => response)
  },
  updateArticle(slug, title, description, body, tagList) {
    return instance
      .put('articles/' + slug, {
        article: {
          title,
          description,
          body,
          tagList,
        },
      })
      .then((response) => response)
  },
  deleteArticle(slug) {
    return instance.delete('articles/' + slug).then((response) => response)
  },
  favoriteArticle(slug) {
    return instance.post('articles/' + slug + '/favorite').then((response) => response)
  },
  unFavoriteArticle(slug) {
    return instance.delete('articles/' + slug + '/favorite').then((response) => response)
  },
}
