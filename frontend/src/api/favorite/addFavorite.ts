import { config } from '../../config';

export const addFavorite = async (id: string) => {
  const response = await fetch(`${config.API_URL}/favorite`, {
    method: 'POST',
    body: JSON.stringify({ id }),
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
