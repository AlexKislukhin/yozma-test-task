import { config } from '../../config';

export interface ISearchRespose {
  id: string;
  name: string;
  artists: string;
  album: {
    cover: string;
  };
}

export interface SearchParams {
  query: string;
  per_page?: number;
  page?: number;
}

export const search = async ({ query, page = 1, per_page = 10 }: SearchParams): Promise<ISearchRespose[]> => {
  if (!query) {
    return [];
  }

  const response = await fetch(`${config.API_URL}/search?q=${query}&page=${page}&per_page=${per_page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
