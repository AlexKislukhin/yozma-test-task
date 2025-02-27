import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '../api/auth/login';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => loginRequest(username, password),
  });
};
