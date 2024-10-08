import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const fetchServer = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  const token = cookies().get('token');

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token && { Authorization: `Bearer Token ${token.value}` }),
    },
  });

  if (response.status === 401) {
    redirect('/');
  }

  return response;
};
