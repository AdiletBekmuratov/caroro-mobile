import { Article } from '@/types/index';
import { baseApi } from './baseApi';

export const makesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    findAllArticles: builder.query<Article[], void>({
      query: () => `/articles`,
    }),
    findOneArticle: builder.query<Article, number>({
      query: id => `/articles/${id}`,
    }),
  }),
});

export const { useFindAllArticlesQuery, useFindOneArticleQuery } = makesApi;
