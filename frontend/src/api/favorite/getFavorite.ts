import { config } from '../../config';

export const getFavorite = async () => {
  const response = await fetch(`${config.API_URL}/favorite`, {
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
