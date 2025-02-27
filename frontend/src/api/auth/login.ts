import { config } from '../../config';

export const loginRequest = async (username: string, password: string) => {
  const response = await fetch(`${config.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 401) {
    throw new Error('Invalid credentials');
  }

  return response.json();
};
