import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
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
  getUser() {
    return instance.get('user').then((response) => response.data)
  },
  updateUser(username, email, password, bio, image) {
    return instance
      .put('users', {
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
  getArticlesFollow(limit = 20, offset = 0) {
    return instance.get('articles/feed?limit=' + limit + '&offset=' + offset).then((response) => response)
  },
  getArticlesGlobally(tag = '', author = '', favorited = '', limit = 20, offset = 0) {
    return instance
      .get(
        'articles?tag=' +
          tag +
          '&author=' +
          author +
          '&favorited=' +
          favorited +
          '&limit=' +
          limit +
          '&offset=' +
          offset
      )
      .then((response) => response)
  },
  createArticle(title, description, body, tagList) {
    return instance
      .post('articles', {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: [...tagList],
        },
      })
      .then((response) => response)
  },
  getArticle(slug) {
    return instance.get('articles/' + slug).then((response) => response)
  },
  updateArticle(slug, title, description, body) {
    return instance
      .put('articles' + slug, {
        article: {
          title: title,
          description: description,
          body: body,
        },
      })
      .then((response) => response)
  },
  deleteArticle(slug) {
    return instance.delete('articles/' + slug).then((response) => response)
  },
}

export const CommentsAPI = {
  getCommentsArticle(slug) {
    return instance.get('articles/' + slug + '/comments').then((response) => response)
  },
  createComment(body, slug) {
    return instance
      .post('articles/' + slug + '/comments', {
        comment: {
          body: body,
        },
      })
      .then((response) => response)
  },
  deleteComment(slug, id) {
    return instance.delete('articles/' + slug + '/comments/' + id).then((response) => response)
  },
}

export const FavoritesAPI = {
  Follow(slug) {
    return instance.post('articles/' + slug + '/favorite').then((response) => response)
  },
  UnFollow(slug) {
    return instance.delete('articles/' + slug + '/favorite').then((response) => response)
  },
}

export const TagsAPI = {
  getTags() {
    return instance.get('/tags').then((response) => response)
  },
}
