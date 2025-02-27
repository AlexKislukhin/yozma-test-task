import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { getFavorite } from '../api/favorite/getFavorite';
import { useNavigate } from 'react-router';

interface LoginData {
  username: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>();

  const { mutateAsync, isPending, isError } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      await mutateAsync(data);
      navigate('/search');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-row min-h-screen justify-center items-center bg-blue-400">
      <div className="mx-auto w-64 bg-white px-8 py-12 border border-gray-400 border-solid rounded-2xl">
        <h2 className="text-2xl text-center font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="w-full border border-gray-400 border-solid my-2 px-2 py-1" {...register('username')} type="text" placeholder="username" />
          <input className="w-full border border-gray-400 border-solid my-2 px-2 py-1" {...register('password')} type="password" placeholder="password" />
          <button disabled={isPending} className="w-full bg-blue-400 cursor-pointer text-white py-2 active:bg-black duration-300" type="submit">
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
        {!isPending && isError && <div className="text-red-400">An error has occured</div>}
      </div>
    </div>
  );
};
