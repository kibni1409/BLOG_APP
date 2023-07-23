export const ActicleInitialState = {
  articles: [],
  slugArticles: {
    slug: null,
    title: null,
    description: null,
    body: null,
    tagList: [null],
    createdAt: null,
    updatedAt: null,
    favorited: true,
    favoritesCount: 0,
    author: {
      username: null,
      bio: null,
      image: null,
      following: true,
    },
  },
  articlesCount: 0,
  statusLoading: false,
  error: '',
}
