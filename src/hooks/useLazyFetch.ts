import { useCallback, useState } from 'react';

const checkStatus = async (response: Response) => {
  if (response.status === 200) {
    return response;
  }
  throw new Error('Status code is not ok');
};

export function useLazyFetch<TData>(
  url: string,
  options?: RequestInit
): [() => Promise<void>, { data?: TData; loading: boolean; error?: string }] {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchUrl = useCallback(
    async function () {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const validResponse = await checkStatus(response);
        const jsonResponse = await validResponse.json();
        setData(jsonResponse);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError('Oops, something went wrong fetching the data');
      }
    },
    [url, options]
  );

  return [fetchUrl, { data, loading, error }];
}
